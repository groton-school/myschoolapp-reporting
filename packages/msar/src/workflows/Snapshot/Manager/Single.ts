import { NumericDuration } from '@battis/descriptive-types';
import { api as types } from 'datadirect';
import { PuppeteerSession } from 'datadirect-puppeteer';
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
 */
export type Context = {
  session?: PuppeteerSession.Authenticated;
  groupId?: number;
  url?: URL | string;
  credentials?: PuppeteerSession.Credentials;
  puppeteerOptions?: PuppeteerSession.Options;
  quit?: boolean;
};

export type Options = SnapshotOptions &
  Context &
  Partial<common.Output.args.Parsed> &
  common.Workflow.args.Parsed;

export async function snapshot({
  session,
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
  if (url && groupId === undefined) {
    groupId = parseInt(
      (url.toString().match(/https:\/\/[^0-9]+(\d+)/) || { 1: '' })[1]
    );
  }
  if (!groupId) {
    throw new Error('Group ID cannot be determined');
  }
  common.Debug.withGroupId(groupId, 'Start');

  if (!session) {
    if (url) {
      common.Debug.withGroupId(groupId, 'Creating session');
      session = await PuppeteerSession.Fetchable.init(url, {
        credentials,
        ...puppeteerOptions
      });
    } else {
      throw new Error(
        'An LMS URL is required to open a new datadirect session'
      );
    }
  } else {
    common.Debug.withGroupId(groupId, 'Forking session in new window');
    session = await session.fork(
      `/app/faculty#academicclass/${groupId}/0/bulletinboard`
    );
  }

  const Start = new Date();

  const endpointParams = { session, groupId, ...options };
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
      Host: (await session.url()).host,
      User: await session.user(),
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
    common.Debug.withGroupId(
      groupId,
      'Captured snapshot',
      `${snapshot.SectionInfo.Teacher}'s ${snapshot.SectionInfo.SchoolYear} ${snapshot.SectionInfo.Duration} ${snapshot.SectionInfo.GroupName})`
    );
  } else {
    common.Debug.errorWithGroupId(
      groupId,
      'Captured snapshot with errors',
      'Missing SectionInfo'
    );
  }
  snapshot.Metadata.Finish = new Date();
  snapshot.Metadata.Elapsed =
    snapshot.Metadata.Finish.getTime() - snapshot.Metadata.Start.getTime();

  if (outputOptions?.outputPath) {
    const { outputPath, pretty } = outputOptions;
    let basename = 'snapshot';
    if (snapshot.SectionInfo) {
      basename = `${snapshot.SectionInfo.SchoolYear} - ${snapshot.SectionInfo.Teacher} - ${snapshot.SectionInfo.GroupName} - ${snapshot.SectionInfo.Id}`;
    }
    const filepath = await common.Output.avoidOverwrite(
      common.Output.filePathFromOutputPath(outputPath, `${basename}.json`)
    );
    common.Output.writeJSON(filepath, snapshot, { pretty });
    common.Output.writeJSON(
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
    await session.close();
  }

  return snapshot;
}
