import cli from '@battis/qui-cli';
import cliProgress from 'cli-progress';
import { api, PuppeteerSession } from 'datadirect-puppeteer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
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
  } & common.args.Parsed;

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
  const { ignoreErrors, batchSize } = options;
  const { outputPath, pretty } = outputOptions;

  const session = await PuppeteerSession.Fetchable.init(url, {
    credentials,
    ...puppeteerOptions
  });
  cli.log.info(
    `Snapshot temporary files will be saved to ${cli.colors.url(TEMP)}`
  );
  const associations = cleanSplit(association);
  const terms = cleanSplit(termsOffered);
  const groups = (
    await api.datadirect.groupFinderByYear({
      session,
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
  const progressBars = new cliProgress.MultiBar({});
  const progress = progressBars.create(groups.length, 0);
  if (groupsPath) {
    groupsPath = common.output.filePathFromOutputPath(
      groupsPath,
      'groups.json'
    );
    common.output.writeJSON(groupsPath, groups, {
      pretty
    });
  }

  const zeros = new Array((groups.length + '').length).fill(0).join('');
  function pad(n: number) {
    return (zeros + n).slice(-zeros.length);
  }

  const errors: typeof groups = [];

  // FIXME msar snapshot --all needs to return to batched snapshots
  for (let i = 0; i < groups.length; i++) {
    try {
      const tempPath = path.join(TEMP, `${pad(i)}.json`);
      const snapshot = await Single.snapshot({
        session,
        ...options,
        groupId: groups[i].lead_pk,
        quit: true
      });
      common.output.writeJSON(tempPath, snapshot);
      progressBars.log(
        `Wrote snapshot ${snapshot?.SectionInfo?.Teacher}'s ${snapshot?.SectionInfo?.SchoolYear} ${snapshot?.SectionInfo?.GroupName} ${snapshot?.SectionInfo?.Block} to ${cli.colors.url(outputPath)}\n`
      );
    } catch (error) {
      if (ignoreErrors) {
        cli.log.error(`Group ${groups[i].lead_pk}: ${cli.colors.error(error)}`);
        errors.push(groups[i]);
      } else {
        throw error;
      }
    }
    progress.increment();
  }

  const data: Single.Data[] = [];
  let Start = new Date();
  let Finish = new Date('1/1/1970');
  let first: Single.Metadata | undefined = undefined;

  const partials = await fs.readdir(TEMP);
  for (const partial of partials) {
    const snapshot = JSON.parse(
      (await fs.readFile(path.join(TEMP, partial))).toString()
    ) as Single.Data;
    data.push(snapshot);
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
  const filepath = await common.output.avoidOverwrite(
    common.output.filePathFromOutputPath(outputPath, 'snapshot.json'),
    common.output.AddTimestamp
  );
  const { bulletinBoard, topics, assignments, gradebook } = options;
  common.output.writeJSON(filepath, data, { pretty });
  common.output.writeJSON(filepath.replace(/\.json$/, '.metadata.json'), {
    ...first,
    Start,
    Finish,
    year,
    batchSize,
    groupsPath,
    bulletinBoard,
    topics,
    assignments,
    gradebook
  });
  if (errors.length) {
    const errorsPath = filepath.replace(/\.json$/, '.errors.json');
    common.output.writeJSON(errorsPath, errors);
    cli.log.error(`Errors output to ${cli.colors.url(errorsPath)}`);
  }
  await fs.rm(TEMP, { recursive: true });
  progressBars.stop();

  if (quit) {
    session.close();
  }
}
