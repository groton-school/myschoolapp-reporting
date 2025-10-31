import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { Workflow } from '@msar/workflow';
import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import { Progress } from '@qui-cli/progress';
import { Root } from '@qui-cli/root';
import { stringify } from 'csv';
import { parse } from 'csv/sync';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Handler, HTTPResponse } from 'puppeteer';

PuppeteerSession.configure({ headless: true });

export type Configuration = {
  users?: string[];
  column?: string;
  download?: boolean;
};

const URL_ARG = 'instanceURL';
const CSV_ARG = 'pathToSourceCsvFile';

export const name = '@msar/pronunciation';

let url: string | undefined = undefined;
let pathToUserListCsv: string | undefined = undefined;
let users: string[] = [];
let column = 'User ID';
let download = true;

const PronunciationColumns = {
  Recorded: 'Recorded',
  FilePath: 'File Path',
  Downloaded: 'Downloaded'
};

export function configure(config: Configuration = {}) {
  users = Plugin.hydrate(config.users, users);
  column = Plugin.hydrate(config.column, column);
  download = Plugin.hydrate(config.download, download);
}

export function options(): Plugin.Options {
  Positionals.require({
    [URL_ARG]: {
      description: `The URL of the LMS instance as ${Colors.positionalArg(URL_ARG)} (required)`
    },
    [CSV_ARG]: {
      description: `Path to a CSV file of users with a column of Blackbaud User IDs to analyze as ${Colors.positionalArg(CSV_ARG)} (optional if ${Colors.value('--val')} is set)`
    }
  });
  Positionals.allowOnlyNamedArgs();
  Positionals.requireAtLeast(1);
  return {
    man: [
      { level: 1, text: 'Name pronunciation options' },
      {
        text: `Scan users for name pronunciation recordings. Include the URL of the LMS instance as ${Colors.positionalArg(URL_ARG)} (required) and path to a CSV file of Blackbaud User IDs to analyze as ${Colors.positionalArg(CSV_ARG)} (optional if ${Colors.value('--user')} is set). Intended to receive a generic ${Colors.url('UserWorkList.csv')} export from the LMS as input, outputting the same CSV file to ${Colors.value('--outputPath')} with data columns appended.`
      },
      {
        text: `Due to the number of impersonated clicks necessary for this workflow, running ${Colors.value('--headless')} reduces the likelihood of stray user actions interfering with the script.`
      }
    ],

    opt: {
      column: {
        description: `Column label for CSV input (${Colors.positionalArg(CSV_ARG)}) column containing Blackbaud Usesr IDs to scan for name pronunciations. Required if opening a CSV file. (default: ${Colors.quotedValue(`"${column}"`)})`,
        default: column
      }
    },
    optList: {
      user: {
        description: `A Blackbaud user ID to scan. May be set multiple times to scan multiple individual users. If set, ${Colors.positionalArg(CSV_ARG)} path to CSV file is not required.`,
        default: users
      }
    },
    flag: {
      download: {
        description: `Download name pronunciation recordings (default: ${Colors.value(download)}, ${Colors.value('--no-download')} to skip)`,
        default: download
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  url = Plugin.hydrate(Positionals.get(URL_ARG), url);
  pathToUserListCsv = Plugin.hydrate(
    Positionals.get(CSV_ARG),
    pathToUserListCsv
  );
  const { user, ...others } = values;
  configure({ users: user, ...others });
}

export async function run() {
  try {
    return await pronunciations();
  } catch (e) {
    const error = e as Error;
    Log.error(Colors.error(error.message));
  }
}

async function pronunciations() {
  if (!url) {
    throw new Error(`Instance URL must be defined`);
  }

  const { data, columns } = await parseCsvFile();
  data.push(...users.map((val) => ({ [column]: val })));
  if (data.length === 0) {
    throw new Error(
      `Inbox users must be passed as either a path to a CSV file or a list of ${Colors.value('val')}`
    );
  }

  const session = await PuppeteerSession.Authenticated.getInstance(url, {
    logRequests: Workflow.logRequests()
  });
  session.page.setRequestInterception(true);
  session.page.on('request', (request) => request.continue());

  const recordingPath = await Output.avoidOverwrite(
    Output.filePathFromOutputPath(Output.outputPath(), 'recordings')
  );
  if (download) {
    if (!existsSync(recordingPath)) {
      await fs.mkdir(recordingPath, { recursive: true });
    }
    Log.info(`Recordings will be downloaded to ${Colors.url(recordingPath)}`);
  }

  Progress.start({ max: data.length });
  columns.push(...Object.values(PronunciationColumns));

  for (const row of data) {
    await new Promise<void>((resolve) => {
      const val = `${row[column]}`;
      let sas_url: string | undefined = undefined;
      const responseHandler: Handler<HTTPResponse> = async (response) => {
        const request = response.request();
        if (request.resourceType() === 'xhr') {
          if (request.url() === sas_url) {
            await saveRecording(recordingPath, row, response);
            detachAndResolve(session, responseHandler, resolve);
          } else if (
            /\/namep\/v1\/usernamepronunciation\/\d+\?addin=1$/.test(
              request.url()
            )
          ) {
            sas_url = await getRecordingUrl(response, sas_url, row);
            row[PronunciationColumns.Recorded] = (
              sas_url !== undefined
            ).toString();
            if (sas_url && download) {
              awaitPronunciation(session);
            } else {
              detachAndResolve(session, responseHandler, resolve);
            }
          }
        }
      };
      session.page.on('response', responseHandler);
      session.goto(
        new URL(`/app/core?svcid=edu#userprofile/${val}/contactcard`, url)
      );
    });
  }
  await session.close();
  const indexPath = await Output.avoidOverwrite(
    Output.filePathFromOutputPath(Output.outputPath(), 'pronunciations.csv')
  );
  await fs.writeFile(indexPath, stringify(data, { header: true, columns }));
  Progress.stop();
  Log.info(`Index written to ${Colors.url(indexPath)}`);
}

async function getRecordingUrl(
  response: HTTPResponse,
  sas_url: string | undefined,
  row: Record<string, string | number>
) {
  try {
    const data = await response.json();
    if (data.file_exists) {
      row[PronunciationColumns.Recorded] = 'Yes';
      return data.sas_url;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // ignore JSON parse error
  }
  return undefined;
}

async function saveRecording(
  recordingPath: string,
  row: Record<string, string | number>,
  response: HTTPResponse
) {
  const filePath = path.resolve(recordingPath, `${row[column]}.mp3`);
  await fs.writeFile(filePath, await response.buffer());
  row[PronunciationColumns.FilePath] = filePath;
  row[PronunciationColumns.Downloaded] = new Date().toISOString();
}

async function parseCsvFile() {
  let columns = [column];
  let data: Record<string, string | number>[] = [];
  if (pathToUserListCsv) {
    data = parse(
      await fs.readFile(path.resolve(Root.path(), pathToUserListCsv)),
      {
        bom: true,
        columns: (row: string[]) => {
          if (!row.includes(column)) {
            throw new Error(
              `Column ${Colors.quotedValue(`"${column}`)} not found in CSV data: ${row.map((col) => Colors.quotedValue(col)).join(', ')}`
            );
          }
          columns = row;
          return row;
        }
      }
    );
  }
  return { columns, data };
}

async function awaitPronunciation(session: PuppeteerSession.Authenticated) {
  const iframe = await session.page.waitForSelector(
    'iframe[title="Name Pronunciation"]'
  );
  const content = await iframe?.contentFrame();
  const button = await content?.waitForSelector(
    '.play-name-pronunciation:has([data-sky-icon="play-circle"])'
  );
  button?.$eval('*', (elt) => elt.click());
}

function detachAndResolve(
  session: PuppeteerSession.Authenticated,
  responseHandler: Handler<HTTPResponse>,
  resolve: (value: void | PromiseLike<void>) => void
) {
  session.page.off('response', responseHandler);
  Progress.increment();
  resolve();
}
