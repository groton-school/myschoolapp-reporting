import { NumericDuration } from '@battis/descriptive-types';
import cli from '@battis/qui-cli';
import { api as types } from 'datadirect';
import * as datadirect from 'datadirect-puppeteer';
import * as common from '../../../common.js';
import * as Area from '../Area.js';

export type Metadata = {
  Host: string;
  User: string;
  Start: Date;
  Finish: Date;
  Elapsed?: NumericDuration;
};

export type Data = {
  Metadata: Metadata;
  GroupId: number;
  SectionInfo?: Area.SectionInfo.Data;
  BulletinBoard?: Area.BulletinBoard.Data;
  Topics?: Area.Topics.Data;
  Assignments?: Area.Assignments.Data;
  Gradebook?: Area.GradeBook.Data;
};

export type SnapshotOptions = {
  bulletinBoard?: boolean;
  topics?: boolean;
  assignments?: boolean;
  gradebook?: boolean;
  studentData?: boolean;
  payload?: types.datadirect.common.ContentItem.Payload;
};

/*
 * FIXME Context typing
 *   Short version: I'm right and TypeScript is wrong.
export type Context =
  | {
      api: datadirect.api;
      groupId: number;
      url: never;
      credentials: never;
      puppeteerOptions: never;
      quit?: boolean;
    }
  | ({
      api: never;
      groupId: never;
      url: URL | string;
    } & common.PuppeteerSession.args.Parsed);
*/
export type Context = {
  api?: datadirect.api;
  groupId?: number;
  url?: URL | string;
  credentials?: datadirect.PuppeteerSession.Credentials;
  puppeteerOptions?: datadirect.PuppeteerSession.Options;
  quit?: boolean;
};

export type Options = SnapshotOptions &
  Context &
  common.output.args.Parsed &
  common.workflow.args.Parsed;

export async function snapshot({
  api,
  url,
  credentials,
  puppeteerOptions,
  groupId,
  bulletinBoard,
  topics,
  assignments,
  gradebook,
  outputOptions,
  quit,
  ...options
}: Options) {
  if (!api) {
    if (url) {
      api = await new datadirect.api(url, {
        credentials,
        ...puppeteerOptions
      }).ready();
    } else {
      throw new Error(
        'An LMS URL is required to open a new datadirect session'
      );
    }
  } else {
    api = await (
      await api.fork(`/app/faculty#academicclass/${groupId}/0/bulletinboard`)
    ).ready();
  }
  const Start = new Date();
  if (url && groupId === undefined) {
    groupId = parseInt(
      (url.toString().match(/https:\/\/[^0-9]+(\d+)/) || { 1: '' })[1]
    );
  }

  if (!groupId) {
    throw new Error('Group ID cannot be determined');
  }

  cli.log.debug(`Capturing section ID ${groupId}`);
  const endpointParams = { api, groupId, options };
  const [SectionInfo, BulletinBoard, Topics, Assignments, Gradebook] =
    await Promise.all([
      Area.SectionInfo.snapshot(endpointParams),
      bulletinBoard ? Area.BulletinBoard.snaphot(endpointParams) : undefined,
      topics ? Area.Topics.snapshot(endpointParams) : undefined,
      assignments ? await Area.Assignments.snapshot(endpointParams) : undefined,
      gradebook ? Area.GradeBook.snapshot(endpointParams) : undefined
    ]);

  const snapshot: Data = {
    Metadata: {
      Host: api.url().host,
      User: await api.user(),
      Start,
      Finish: new Date()
    },
    GroupId: groupId,
    SectionInfo,
    BulletinBoard,
    Topics,
    Assignments,
    Gradebook
  };

  if (snapshot.SectionInfo && 'Teacher' in snapshot.SectionInfo) {
    cli.log.debug(
      `Group ${snapshot.SectionInfo.Id}: Snapshot captured (${snapshot.SectionInfo.Teacher}'s ${snapshot.SectionInfo.SchoolYear} ${snapshot.SectionInfo.Duration} ${snapshot.SectionInfo.GroupName})`
    );
  } else {
    cli.log.error(`Captured snapshot of section ${groupId} with errors`);
  }
  snapshot.Metadata.Finish = new Date();
  snapshot.Metadata.Elapsed =
    snapshot.Metadata.Finish.getTime() - snapshot.Metadata.Start.getTime();

  if (outputOptions.outputPath) {
    const { outputPath, pretty } = outputOptions;
    let basename = 'snapshot';
    if (snapshot.SectionInfo) {
      basename = `${snapshot.SectionInfo.SchoolYear} - ${snapshot.SectionInfo.Teacher} - ${snapshot.SectionInfo.GroupName} - ${snapshot.SectionInfo.Id}`;
    }
    const filepath = await common.output.avoidOverwrite(
      common.output.filePathFromOutputPath(outputPath, `${basename}.json`)
    );
    common.output.writeJSON(filepath, snapshot, { pretty });
    common.output.writeJSON(
      filepath.replace(/\.json$/, '.metadata.json'),
      {
        ...snapshot.Metadata,
        bulletinBoard,
        topics,
        assignments,
        gradebook,
        options
      },
      { pretty }
    );
  }

  if (quit) {
    await api.close();
  }

  return snapshot;
}
