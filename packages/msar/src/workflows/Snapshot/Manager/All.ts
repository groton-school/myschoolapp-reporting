import cli from '@battis/qui-cli';
import { api, PuppeteerSession } from 'datadirect-puppeteer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import PQueue from 'p-queue';
import * as common from '../../../common.js';
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
  } & common.Args.Parsed;

export type Item = Single.Data;
export type Data = Item[];

const TEMP = path.join('/tmp/msar/snapshot', crypto.randomUUID());

function cleanSplit(list?: string) {
  return (list || '').split(',').map((item) => item.trim());
}

export async function snapshot({
  url,
  credentials,
  puppeteerOptions,
  association,
  termsOffered,
  year,
  groupsPath,
  outputOptions,
  quit,
  ...options
}: Options) {
  if (!year) {
    throw new Error(`year must be defined`);
  }
  const { ignoreErrors, concurrentThreads } = options;
  const { outputPath, pretty } = outputOptions;

  const spinner = cli.spinner();
  spinner.start('Waiting for authentication…');
  const session = await PuppeteerSession.Fetchable.init(url, {
    credentials,
    ...puppeteerOptions
  });
  spinner.succeed('Authentication complete.');
  cli.log.info(
    `Snapshot temporary files will be saved to ${cli.colors.url(TEMP)}`
  );
  const associations = cleanSplit(association);
  const terms = cleanSplit(termsOffered);
  const groups = (
    await api.datadirect.groupFinderByYear({
      ...options,
      payload: {
        schoolYearLabel: year
      }
    })
  ).filter(
    (group) =>
      (association === undefined || associations.includes(group.association)) &&
      (termsOffered === undefined ||
        terms.reduce(
          (match, term) => match && group.terms_offered.includes(term),
          true
        ))
  );
  cli.log.info(`${groups.length} groups match filters`);

  const progress = new common.ProgressBar({ max: groups.length });
  if (groupsPath) {
    groupsPath = common.Output.filePathFromOutputPath(
      groupsPath,
      'groups.json'
    );
    common.Output.writeJSON(groupsPath, groups, {
      pretty
    });
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
        credentials,
        puppeteerOptions,
        ...options,
        groupId: groups[i].lead_pk,
        quit: true
      });
      data[i] = snapshot;
      // TODO Configurable snapshot --all temp directory
      // TODO Optional snapshot --all temp files
      common.Output.writeJSON(tempPath, snapshot);
      progress.caption(snapshot?.SectionInfo?.GroupName || '');
    } catch (error) {
      if (ignoreErrors) {
        common.Debug.errorWithGroupId(
          groups[i].lead_pk,
          'Error',
          error as string
        );
        errors.push(groups[i]);
      } else {
        throw error;
      }
    }
    progress.increment();
  }

  const queue = new PQueue({ concurrency: concurrentThreads });
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
  const filepath = await common.Output.avoidOverwrite(
    common.Output.filePathFromOutputPath(outputPath, 'snapshot.json'),
    common.Output.AddTimestamp
  );
  const { bulletinBoard, topics, assignments, gradebook } = options;
  common.Output.writeJSON(filepath, data, { pretty });
  common.Output.writeJSON(filepath.replace(/\.json$/, '.metadata.json'), {
    ...first,
    Start,
    Finish,
    Elapsed: Finish.getTime() - Start.getTime(),
    year,
    concurrentThreads,
    groupsPath,
    bulletinBoard,
    topics,
    assignments,
    gradebook
  });
  if (errors.length) {
    const errorsPath = filepath.replace(/\.json$/, '.errors.json');
    common.Output.writeJSON(errorsPath, errors);
    cli.log.error(`Errors output to ${cli.colors.url(errorsPath)}`);
  }
  await fs.rm(TEMP, { recursive: true });
  progress.stop();

  if (quit) {
    session.close();
  }
}
