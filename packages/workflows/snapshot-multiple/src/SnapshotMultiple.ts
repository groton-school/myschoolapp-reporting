import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { Progress } from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { RateLimiter } from '@msar/rate-limiter';
import * as Snapshot from '@msar/snapshot/dist/Snapshot.js';
import * as SnapshotType from '@msar/types.snapshot';
import { Workflow } from '@msar/workflow';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import PQueue from 'p-queue';

Core.configure({ core: { requirePositionals: true } });

export const name = '@msar/snapshot-multiple';
export const src = import.meta.dirname;

export type Configuration = {
  all?: boolean;
  association?: string;
  termsOffered?: string;
  year?: string;
  groupsPath?: string;
  url?: string;
  temp?: string;
  retry?: boolean;
};

let TEMP = path.join('/tmp/msar/snapshot', crypto.randomUUID());

let all = false;
let association: string | undefined = undefined;
let termsOffered: string | undefined = undefined;
let groupsPath: string | undefined = undefined;
let retry = false;

let year = `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`;
if (new Date().getMonth() <= 6) {
  year = `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`;
}

let url: string | undefined = undefined;

function cleanSplit(list?: string) {
  return (list || '').split(',').map((item) => item.trim());
}

export function configure(config: Configuration = {}) {
  all = Plugin.hydrate(config.all, all);
  association = Plugin.hydrate(config.association, association);
  termsOffered = Plugin.hydrate(config.termsOffered, termsOffered);
  year = Plugin.hydrate(config.year, year);
  groupsPath = Plugin.hydrate(config.groupsPath, groupsPath);
  url = Plugin.hydrate(config.url, url);
  retry = Plugin.hydrate(config.retry, retry);
  TEMP = path.join(
    '/tmp/msar/snapshot',
    Plugin.hydrate(config.temp, crypto.randomUUID())
  );
}

export function options(): Plugin.Options {
  const snapshotOptions = Snapshot.options();
  return {
    ...snapshotOptions,
    flag: {
      ...snapshotOptions.flag,
      all: {
        short: 'A',
        description: `Capture all sections (default: ${Colors.value(all)}, positional argument ${Colors.value(`arg0`)} is used to identify MySchoolApp instance)`,
        default: all
      },
      retry: {
        description: `Retry a previous snapshot. If this flag is set, ${Colors.value('arg0')} must be the path to an existing snapshot JSON file.`
      }
    },
    opt: {
      ...snapshotOptions.opt,
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
      resume: {
        description: `If ${Colors.value(`--all`)} flag is used,UUID name of temp directory (${Colors.url('/tmp/msar/snapshot/:uuid')}) for which to resume collecting snapshots`
      }
    },
    man: [
      {
        text: `Capture a JSON snapshot of an individual course or of a collection of courses (using the ${Colors.value('--all')} flag). In addition to relevant flags and options, the only argument expected is a URL (${Colors.value('arg0')}) to a page within the target course (or target LMS instance, if snapshotting more than one course).`
      }
    ]
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  Snapshot.init(args);
  const {
    positionals: [url]
  } = args;
  configure({ ...args.values, url });
}

export async function run() {
  let snapshots: SnapshotType.Multiple.Data<string, string> | undefined =
    undefined;
  if (retry) {
    if (!url) {
      throw new Error(
        `${Colors.value('arg0')} must be a path to an existing snapshot JSON file`
      );
    }
    const filePath = path.resolve(Root.path(), url);
    const file = JSON.parse(fs.readFileSync(filePath).toString()) as
      | SnapshotType.Multiple.Data<string, string>
      | SnapshotType.Data<string, string>;
    if (file) {
      Output.configure({ outputPath: filePath });
      if (Array.isArray(file)) {
        snapshots = file;
      } else {
        snapshots = [file];
      }
    } else {
      throw new Error(`No snapshot data in ${Colors.url(url)}`);
    }
  }
  if (!all && !snapshots) {
    Snapshot.run();
  } else {
    let session: PuppeteerSession.Authenticated | undefined = undefined;
    let groups: { lead_pk: number }[] | undefined = undefined;
    if (snapshots) {
      const hostname = snapshots.reduce(
        (hostname: string | undefined, snapshot) => {
          if (hostname) {
            return hostname;
          } else {
            return snapshot.Metadata.Host;
          }
        },
        undefined
      );
      session = await PuppeteerSession.Fetchable.init(`https://${hostname}`, {
        logRequests: Workflow.logRequests()
      });
      groups = snapshots.map((snapshot) => ({ lead_pk: snapshot.GroupId }));
      Log.info(`Retrying ${groups.length} groups in ${Colors.url(url)}`);
    } else {
      if (!url) {
        throw new Error(
          `${Colors.value('arg0')} must be the URL of an LMS instance`
        );
      }

      if (!year) {
        throw new Error(`${Colors.value('--year')} must be defined`);
      }
      session = await PuppeteerSession.Fetchable.init(url, {
        logRequests: Workflow.logRequests()
      });

      Log.info(`Snapshot temporary files will be saved to ${Colors.url(TEMP)}`);
      const associations = cleanSplit(association);
      const terms = cleanSplit(termsOffered);
      groups = (
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
      Log.info(`${groups.length} groups match filters`);
    }
    if (!groups) {
      throw new Error(`No groups identified`);
    }
    Progress.start({ max: groups.length });
    if (groupsPath) {
      groupsPath = Output.filePathFromOutputPath(groupsPath, 'groups.json');
      Output.writeJSON(groupsPath, groups);
    }

    const zeros = new Array((groups.length + '').length).fill(0).join('');
    function pad(n: number) {
      return (zeros + n).slice(-zeros.length);
    }

    const errors: typeof groups = [];
    const data: SnapshotType.Multiple.Data<string, string | Date> = [];

    async function snapshotGroup(i: number) {
      const tempPath = path.join(TEMP, `${pad(i)}.json`);
      try {
        /**
         * FIXME redundant memory and temp file storage
         *   Need to do some testing, but it would probably be more memory
         *   efficient to write temp files and NOT store data to memory, an
         *   then to copy the files into the final snapshot one at a time at
         *   the end
         */
        data[i] = await Snapshot.snapshot({
          ...Snapshot.getConfig(),
          session,
          groupId: groups![i].lead_pk,
          metadata: false,
          silent: true,
          quit: true,
          section: snapshots && snapshots.length > i ? snapshots[i] : undefined
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
          Debug.errorWithGroupId(groups![i].lead_pk, 'Error', error as string);
          errors.push(groups![i]);
        } else {
          throw error;
        }
      }
      Progress.increment();
    }

    let resume = 0;
    if (fs.existsSync(TEMP)) {
      resume = Math.max(
        resume,
        ...fs.readdirSync(TEMP).map((name) => parseInt(name))
      );
      for (let i = 0; i <= resume; i++) {
        data[i] = JSON.parse(
          fs.readFileSync(path.resolve(TEMP, `${pad(i)}.json`)).toString()
        );
      }
    }
    const queue = new PQueue({ concurrency: RateLimiter.concurrency() });
    await queue.addAll(
      groups.slice(resume).map((group, i) => snapshotGroup.bind(null, i))
    );

    let Start = new Date();
    let Finish = new Date('1/1/1970');
    let first: SnapshotType.Metadata.Data<string | Date> | undefined =
      undefined;

    for (const snapshot of data) {
      if (snapshot.Metadata.Start < Start) {
        Start = new Date(snapshot.Metadata.Start);
      }
      if (snapshot.Metadata.Finish > Finish) {
        Finish = new Date(snapshot.Metadata.Finish);
      }
      if (!first) {
        first = snapshot.Metadata;
      }
    }
    let filepath = Output.filePathFromOutputPath(
      Output.outputPath(),
      'snapshot.json'
    );
    if (!retry) {
      filepath = await Output.avoidOverwrite(filepath, Output.AddTimestamp);
    }
    Output.writeJSON(filepath, data, { overwrite: retry });
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
    if (fs.existsSync(TEMP)) {
      fs.rmSync(TEMP, { recursive: true });
    }
    Progress.stop();

    if (PuppeteerSession.quit()) {
      session.close();
    }
  }
}
