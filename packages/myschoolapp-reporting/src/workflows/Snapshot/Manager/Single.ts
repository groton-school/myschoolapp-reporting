import cli from '@battis/qui-cli';
import { Page } from 'puppeteer';
import * as common from '../../../common.js';
import * as Area from '../Area.js';
import { TEMPORARY_payloadToURLSearchParams } from './TEMPORARY_payloadToURLSearchParams.js';

export type Metadata = {
  Host: string;
  User: string;
  Start: Date;
  Finish: Date;
  Elapsed?: TimeString;
};

export type Data = {
  Metadata: Metadata;
  GroupId: number;
  SectionInfo?: Area.SectionInfo.Data;
  BulletinBoard?: Area.BulletinBoard.Data;
  Topics?: Area.Topics.Data;
  Assignments?: Area.Assignments.Data;
  Gradebook?: Area.Gradebook.Data | { error: string };
};

export type BaseOptions = {
  bulletinBoard?: boolean;
  topics?: boolean;
  assignments?: boolean;
  gradebook?: boolean;
} & Area.Base.Options;

export type Options = BaseOptions & {
  url?: string;
  groupId?: number;
};

export async function capture(
  parent: Page,
  {
    url,
    groupId,
    bulletinBoard,
    topics,
    assignments,
    gradebook,
    outputPath,
    pretty,
    ...options
  }: Options & Partial<common.output.args.Parsed['outputOptions']>
) {
  if (url && groupId === undefined) {
    groupId = parseInt((url.match(/https:\/\/[^0-9]+(\d+)/) || { 1: '' })[1]);
  }

  if (groupId) {
    cli.log.debug(`Capturing section ID ${groupId}`);
    const page = await parent.browser().newPage();
    const hostUrl = new URL(url || parent.url());
    await page.goto(
      `https://${hostUrl.host}/app/faculty#academicclass/${groupId}/0/bulletinboard`
    );

    const [SectionInfo, BulletinBoard, Topics, Assignments, Gradebook] =
      await Promise.all([
        Area.SectionInfo.snapshot({ page, groupId, ...options }),
        bulletinBoard
          ? Area.BulletinBoard.snaphot({
              page,
              groupId,
              ...options
            })
          : undefined,
        topics
          ? Area.Topics.snapshot({
              page,
              groupId,
              ...options
            })
          : undefined,
        assignments
          ? await Area.Assignments.snapshot({ page, groupId, ...options })
          : undefined,
        gradebook
          ? // TODO more granular processing of student data in gradebook
            options.studentData
            ? Area.Gradebook.capture(
                page,
                groupId.toString(),
                TEMPORARY_payloadToURLSearchParams(
                  options.payload || { format: 'json' }
                ),
                options.ignoreErrors
              )
            : { error: new Area.Base.StudentDataError().message }
          : undefined
      ]);

    const snapshot: Data = {
      Metadata: {
        Host: url
          ? new URL(url).hostname
          : await page.evaluate(() => window.location.hostname),
        User: await page.evaluate(
          async () => (await BBAuthClient.BBAuth.getDecodedToken(null)).email
        ),
        Start: new Date(),
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
    snapshot.Metadata.Elapsed = `${snapshot.Metadata.Finish.getTime() - snapshot.Metadata.Start.getTime()}ms`;
    await page.close();
    if (outputPath) {
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
    return snapshot;
  } else {
    cli.log.error('Unknown group ID');
    return undefined;
  }
}
