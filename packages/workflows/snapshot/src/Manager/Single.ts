import { NumericDuration } from '@battis/descriptive-types';
import { Debug } from '@msar/debug';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { api as types } from 'datadirect';
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
  outputPath?: string;
  quit?: boolean;
};

/*
 * FIXME Context typing
 *   Short version: I'm right and TypeScript is wrong.
 */
export type Context = {
  session?: PuppeteerSession.Authenticated;
  groupId?: number;
  url?: URL | string;
};

export type Options = SnapshotOptions & Context;

export async function snapshot({
  session,
  url,
  groupId,
  bulletinBoard,
  topics,
  assignments,
  gradebook,
  outputPath,
  quit = PuppeteerSession.quit(),
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
  Debug.withGroupId(groupId, 'Start');

  if (!session) {
    if (url) {
      Debug.withGroupId(groupId, 'Creating session');
      session = await PuppeteerSession.Fetchable.init(url);
    } else {
      throw new Error(
        'An LMS URL is required to open a new datadirect session'
      );
    }
  } else {
    Debug.withGroupId(groupId, 'Forking session in new window');
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
    Debug.withGroupId(
      groupId,
      'Captured snapshot',
      `${snapshot.SectionInfo.Teacher}'s ${snapshot.SectionInfo.SchoolYear} ${snapshot.SectionInfo.Duration} ${snapshot.SectionInfo.GroupName})`
    );
  } else {
    Debug.errorWithGroupId(
      groupId,
      'Captured snapshot with errors',
      'Missing SectionInfo'
    );
  }
  snapshot.Metadata.Finish = new Date();
  snapshot.Metadata.Elapsed =
    snapshot.Metadata.Finish.getTime() - snapshot.Metadata.Start.getTime();

  if (outputPath) {
    let basename = 'snapshot.json';
    if (snapshot.SectionInfo) {
      basename = Output.pathsafeFilename(
        `${snapshot.SectionInfo.SchoolYear} - ${snapshot.SectionInfo.Teacher} - ${snapshot.SectionInfo.GroupName} - ${snapshot.SectionInfo.Id}.json`
      );
    }
    const filepath = await Output.avoidOverwrite(
      Output.filePathFromOutputPath(outputPath, basename)
    );
    Output.writeJSON(filepath, snapshot);
    Output.writeJSON(filepath.replace(/\.json$/, '.metadata.json'), {
      ...snapshot.Metadata,
      bulletinBoard,
      topics,
      assignments,
      gradebook,
      options
    });
  }

  if (quit) {
    await session.close();
  }

  return snapshot;
}
