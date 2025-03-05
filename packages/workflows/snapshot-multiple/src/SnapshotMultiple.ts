import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { Progress } from '@battis/qui-cli.progress';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import * as Snapshot from '@msar/snapshot/dist/Snapshot.js';
import { Workflow } from '@msar/workflow';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import ora from 'ora';
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
  url?: URL | string;
};

export type Item = Snapshot.Data;
export type Data = Item[];

const TEMP = path.join('/tmp/msar/snapshot', crypto.randomUUID());

let all = false;
let association: string | undefined = undefined;
let termsOffered: string | undefined = undefined;
let groupsPath: string | undefined = undefined;

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
  url = config.url ? new URL(config.url) : url;
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
  if (!all) {
    Snapshot.run();
  } else {
    if (!url) {
      throw new Error(
        `${Colors.value('arg0')} must be the URL of an LMS instance`
      );
    }

    if (!year) {
      throw new Error(`${Colors.value('--year')} must be defined`);
    }

    const spinner = ora();
    spinner.start('Waiting for authentication…');
    const session = await PuppeteerSession.Fetchable.init(url);
    spinner.succeed('Authentication complete.');
    Log.info(`Snapshot temporary files will be saved to ${Colors.url(TEMP)}`);
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
    Log.info(`${groups.length} groups match filters`);

    Progress.start({ max: groups.length });
    if (!groupsPath) {
      groupsPath = Output.filePathFromOutputPath(groupsPath, 'groups.json');
      Output.writeJSON(groupsPath, groups);
    }

    const zeros = new Array((groups.length + '').length).fill(0).join('');
    function pad(n: number) {
      return (zeros + n).slice(-zeros.length);
    }

    const errors: typeof groups = [];
    const data: Data = [];

    async function snapshotGroup(i: number) {
      const tempPath = path.join(TEMP, `${pad(i)}.json`);
      try {
        const snapshot = await Snapshot.snapshot({
          ...Snapshot.getConfig(),
          session,
          groupId: groups[i].lead_pk,
          quit: true
        });
        data[i] = snapshot;
        // TODO Configurable snapshot --all temp directory
        // TODO Optional snapshot --all temp files
        Output.writeJSON(tempPath, snapshot);
        Progress.caption(snapshot?.SectionInfo?.GroupName || '');
      } catch (error) {
        if (Workflow.ignoreErrors()) {
          Debug.errorWithGroupId(groups[i].lead_pk, 'Error', error as string);
          errors.push(groups[i]);
        } else {
          throw error;
        }
      }
      Progress.increment();
    }

    const queue = new PQueue({ concurrency: Workflow.concurrentThreads() });
    await queue.addAll(groups.map((group, i) => snapshotGroup.bind(null, i)));

    let Start = new Date();
    let Finish = new Date('1/1/1970');
    let first: Snapshot.Metadata | undefined = undefined;

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
