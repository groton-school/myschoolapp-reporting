import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { Progress } from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { RateLimiter } from '@msar/rate-limiter';
import { Snapshot } from '@msar/snapshot';
import * as SnapshotType from '@msar/types.snapshot';
import { Workflow } from '@msar/workflow';
import { parse } from 'csv-parse/sync';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import PQueue from 'p-queue';

export const name = '@msar/snapshot-multiple';

export type Configuration = {
  all?: boolean;
  association?: string;
  termsOffered?: string;
  year?: string;
  csv?: string;
  groupsPath?: string;
  url?: URL | string;
  temp?: string;
};

let TEMP = path.join('/tmp/msar/snapshot', crypto.randomUUID());

let all = false;
let association: string | undefined = undefined;
let termsOffered: string | undefined = undefined;
let groupsPath: string | undefined = undefined;
let csvPath: string | undefined = undefined;

let year = `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`;
if (new Date().getMonth() <= 6) {
  year = `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`;
}

let url: URL | undefined = undefined;

function cleanSplit(list?: string) {
  return (list || '').split(',').map((item) => item.trim());
}

export function configure(config: Configuration = {}) {
  all = Plugin.hydrate(config.all, all);
  association = Plugin.hydrate(config.association, association);
  termsOffered = Plugin.hydrate(config.termsOffered, termsOffered);
  year = Plugin.hydrate(config.year, year);
  groupsPath = Plugin.hydrate(config.groupsPath, groupsPath);
  csvPath = Plugin.hydrate(config.csv, csvPath);
  url = config.url ? new URL(config.url) : url;
  TEMP = path.join(
    '/tmp/msar/snapshot',
    // @ts-expect-error 2345 Plugin.hydrate typing is too narrow
    Plugin.hydrate(config.temp, crypto.randomUUID())
  );
}

export function options(): Plugin.Options {
  return {
    man: [
      { level: 1, text: 'Multiple snapshot options' },
      {
        text: `Capture multiple screenshots using the ${Colors.value('--all')} flag and filter using the available options.`
      }
    ],

    flag: {
      all: {
        short: 'A',
        description: `Capture all sections (default: ${Colors.value(all)}, positional argument ${Colors.positionalArg(`url`)} is used to identify MySchoolApp instance)`,
        default: all
      }
    },
    opt: {
      association: {
        description: `Comma-separated list of group associations to include if ${Colors.value('--all')} flag is used. Possible values: ${Output.oxfordComma(
          [
            'Activities',
            'Advisories',
            'Classes',
            'Community Groups',
            'Dorms',
            'Teams'
          ].map((assoc) => Colors.quotedValue(`"${assoc}"`))
        )}`
      },
      termsOffered: {
        description: `Comma-separated list of terms to include if ${Colors.value('--all')} flag is used`
      },
      groupsPath: {
        description: `Path to output directory or file to save filtered groups listing (include placeholder ${Colors.quotedValue('"%TIMESTAMP%"')} to specify its location, otherwise it is added automatically when needed to avoid overwriting existing files)`
      },
      year: {
        description: `If ${Colors.value(`--all`)} flag is used, which year to download. (Default: ${Colors.quotedValue(`"${year}"`)})`,
        default: year
      },
      csv: {
        description: `Path to CSV file of group IDs to snapshot (must contain a column named ${Colors.value('GroupId')})`
      },
      resume: {
        description: `If ${Colors.value(`--all`)} flag is used,UUID name of temp directory (${Colors.url('/tmp/msar/snapshot/:uuid')}) for which to resume collecting snapshots`
      }
    }
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  const url = Snapshot.getUrl();
  configure({ ...args.values, url });
}

export async function run() {
  if (!all && !csvPath) {
    Snapshot.run();
  } else {
    if (!url) {
      throw new Error(
        `${Colors.positionalArg('url')} must be the URL of an LMS instance`
      );
    }

    const session = await PuppeteerSession.Fetchable.init(url, {
      logRequests: Workflow.logRequests()
    });
    Log.info(`Snapshot temporary files will be saved to ${Colors.url(TEMP)}`);

    let groupIds: number[] = [];
    if (year && all) {
      const associations = cleanSplit(association);
      const terms = cleanSplit(termsOffered);
      const groups = (
        await DatadirectPuppeteer.api.datadirect.groupFinderByYear({
          ...options,
          payload: {
            schoolYearLabel: year
          }
        })
      ).filter(
        (group) =>
          (association === undefined ||
            associations.includes(group.association)) &&
          (termsOffered === undefined ||
            terms.reduce(
              (match, term) => match && group.terms_offered.includes(term),
              true
            ))
      );
      groupIds = groups.map((group) => group.lead_pk);
      Log.info(`${groups.length} groups match filters`);
      if (groupsPath) {
        groupsPath = Output.filePathFromOutputPath(groupsPath, 'groups.json');
        Output.writeJSON(groupsPath, groups);
      }
    } else if (csvPath) {
      groupIds = parse(await fs.readFile(path.resolve(Root.path(), csvPath)), {
        columns: true
      }).map((row: { GroupId: number }) => row.GroupId);
      Log.info(`${groupIds.length} group IDs loaded from CSV file`);
    } else {
      throw new Error(
        `Either ${Colors.value('--year')} or ${Colors.value('--csv')} must be defined`
      );
    }

    Progress.start({ max: groupIds.length });

    const zeros = new Array((groupIds.length + '').length).fill(0).join('');
    function pad(n: number) {
      return (zeros + n).slice(-zeros.length);
    }

    const errors: typeof groupIds = [];
    const data: SnapshotType.Multiple.Data = [];

    async function snapshotGroup(i: number) {
      const tempPath = path.join(TEMP, `${pad(i)}.json`);
      try {
        /**
         * FIXME redundant memory and temp file storage Need to do some testing,
         * but it would probably be more memory efficient to write temp files
         * and NOT store data to memory, an then to copy the files into the
         * final snapshot one at a time at the end
         */
        data[i] = await Snapshot.snapshot({
          ...Snapshot.getConfig(),
          session,
          groupId: groupIds[i],
          metadata: false,
          silent: true,
          quit: true
        });
        /*
         * FIXME redundant writeJSON
         *   By design, snapshot-multiple should just pass an output path to
         *   snapshot to do the write, rather than calling writeJSON itself
         */
        Output.writeJSON(tempPath, data[i], { silent: true });
        Progress.caption(data[i]?.SectionInfo?.GroupName || '');
      } catch (error) {
        if (Workflow.ignoreErrors()) {
          Debug.errorWithGroupId(groupIds[i], 'Error', error as string);
          errors.push(groupIds[i]);
        } else {
          throw error;
        }
      }
      Progress.increment();
    }

    let resume = 0;
    try {
      resume = Math.max(
        resume,
        ...(await fs.readdir(TEMP)).map((name) => parseInt(name))
      );
      for (let i = 0; i <= resume; i++) {
        data[i] = JSON.parse(
          (await fs.readFile(path.resolve(TEMP, `${pad(i)}.json`))).toString()
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // ignore missing temp dir
    }
    const queue = new PQueue({ concurrency: RateLimiter.concurrency() });
    await queue.addAll(
      groupIds.slice(resume + 1).map((group, i) => snapshotGroup.bind(null, i))
    );

    let Start = new Date();
    let Finish = new Date('1/1/1970');
    let first: SnapshotType.Metadata.Data | undefined = undefined;

    for (const snapshot of data) {
      if (snapshot.Metadata.Start < Start) {
        Start = snapshot.Metadata.Start;
      }
      if (snapshot.Metadata.Finish > Finish) {
        Finish = snapshot.Metadata.Finish;
      }
      if (!first) {
        first = snapshot.Metadata;
      }
    }
    const filepath = await Output.avoidOverwrite(
      Output.filePathFromOutputPath(Output.outputPath(), 'snapshot.json'),
      Output.AddTimestamp
    );
    Output.writeJSON(filepath, data);
    Output.writeJSON(filepath.replace(/\.json$/, '.metadata.json'), {
      ...first,
      Start,
      Finish,
      Elapsed: Finish.getTime() - Start.getTime(),
      serverRequests: RateLimiter.requests(),
      serverRequestsPerSecond: RateLimiter.actual(),
      ...Snapshot.getConfig(),
      association,
      termsOffered,
      year
    });
    if (errors.length) {
      const errorsPath = filepath.replace(/\.json$/, '.errors.json');
      Output.writeJSON(errorsPath, errors);
      Log.error(`Errors output to ${Colors.url(errorsPath)}`);
    }
    await fs.rm(TEMP, { recursive: true });
    Progress.stop();

    if (PuppeteerSession.quit()) {
      session.close();
    }
  }
}
