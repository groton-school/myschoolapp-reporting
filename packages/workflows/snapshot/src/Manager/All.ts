import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import { Progress } from '@battis/qui-cli.progress';
import { Debug } from '@msar/debug';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { Workflow } from '@msar/workflow';
import { DatadirectPuppeteer } from 'datadirect-puppeteer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import ora from 'ora';
import PQueue from 'p-queue';
import * as Storage from '../Storage.js';
import * as Single from './Single.js';

export type AllOptions = {
  association?: string;
  termsOffered?: string;
  year?: string;
  groupsPath?: string;
};

export type Options = Single.SnapshotOptions &
  AllOptions & {
    url: URL | string;
  };

export type Item = Single.Data;
export type Data = Item[];

const TEMP = path.join('/tmp/msar/snapshot', crypto.randomUUID());

function cleanSplit(list?: string) {
  return (list || '').split(',').map((item) => item.trim());
}

export async function snapshot({ url, ...options }: Options) {
  if (!Storage.allOptions().year) {
    throw new Error(`year must be defined`);
  }

  const spinner = ora();
  spinner.start('Waiting for authentication…');
  const session = await PuppeteerSession.Fetchable.init(url);
  spinner.succeed('Authentication complete.');
  Log.info(`Snapshot temporary files will be saved to ${Colors.url(TEMP)}`);
  const associations = cleanSplit(Storage.allOptions().association);
  const terms = cleanSplit(Storage.allOptions().termsOffered);
  const groups = (
    await DatadirectPuppeteer.api.datadirect.groupFinderByYear({
      ...options,
      payload: {
        schoolYearLabel: Storage.allOptions().year!
      }
    })
  ).filter(
    (group) =>
      (Storage.allOptions().association === undefined ||
        associations.includes(group.association)) &&
      (Storage.allOptions().termsOffered === undefined ||
        terms.reduce(
          (match, term) => match && group.terms_offered.includes(term),
          true
        ))
  );
  Log.info(`${groups.length} groups match filters`);

  Progress.start({ max: groups.length });
  if (Storage.allOptions().groupsPath) {
    Storage.allOptions().groupsPath = Output.filePathFromOutputPath(
      Storage.allOptions().groupsPath,
      'groups.json'
    );
    Output.writeJSON(Storage.allOptions().groupsPath, groups);
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
      const snapshot = await Single.snapshot({
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
  let first: Single.Metadata | undefined = undefined;

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
  const { bulletinBoard, topics, assignments, gradebook } = options;
  Output.writeJSON(filepath, data);
  Output.writeJSON(filepath.replace(/\.json$/, '.metadata.json'), {
    ...first,
    Start,
    Finish,
    Elapsed: Finish.getTime() - Start.getTime(),
    year: Storage.allOptions().year,
    groupsPath: Storage.allOptions().groupsPath,
    bulletinBoard,
    topics,
    assignments,
    gradebook
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
