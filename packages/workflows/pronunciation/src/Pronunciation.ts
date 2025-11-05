import { PuppeteerSession } from '@msar/puppeteer-session';
import { Workflow } from '@msar/workflow';
import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import { parse } from 'csv/sync';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PronunciationScanner } from './PronunciationScanner.js';

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
      { level: 3, text: 'Name pronunciation options' },
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
    if (!url) {
      throw new Error(`${Colors.positionalArg(URL_ARG)} must be defined`);
    }

    const { data, columns } = await parseCsvFile();
    data.push(...users.map((val) => ({ [column]: val })));
    if (data.length === 0) {
      throw new Error(
        `Inbox users must be passed as either a path to a CSV file or a list of ${Colors.value('val')}`
      );
    }
    return new PronunciationScanner(
      await PuppeteerSession.Authenticated.getInstance(url, {
        logRequests: Workflow.logRequests()
      })
    ).scan({ data, columns, column, download });
  } catch (e) {
    const error = e as Error;
    Log.error(Colors.error(error.message));
  }
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
