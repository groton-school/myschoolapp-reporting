import * as Plugin from '@battis/qui-cli.plugin';
import { JSONObject } from '@battis/typescript-tricks';
import { Debug } from '@msar/debug';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { RateLimiter } from '@msar/rate-limiter';
import { Data } from '@msar/types.snapshot';
import { Workflow } from '@msar/workflow';
import { api } from 'datadirect';
import * as Area from './Area/index.js';
import { unmatchedProperties } from './Area/merge.js';

/*
 * FIXME Context typing
 *   Short version: I'm right and TypeScript is wrong.
 */
export type Context = {
  session?: PuppeteerSession.Authenticated;
  groupId?: number;
  url?: string;
};

export type Configuration = Plugin.Configuration & {
  bulletinBoard?: boolean;
  topics?: boolean;
  assignments?: boolean;
  gradebook?: boolean;
  studentData?: boolean;
  payload?: api.datadirect.common.ContentItem.Payload;
  metadata?: boolean;
  outputPath?: string;
  silent?: boolean;
} & Context &
  Partial<api.datadirect.ContentItem.Payload>;

type ConstructorOptions = Configuration & { section?: Data<string, string> };

export class Snapshot {
  private constructor(private config: ConstructorOptions) {}

  public static async capture(config: ConstructorOptions) {
    const snapshot = new this(config);
    return await snapshot.scrape();
  }

  private async scrape() {
    let groupId = this.config.groupId;
    if (this.config.retry) {
      if (this.config.section) {
        groupId = this.config.section.GroupId;
      } else {
        throw new Error(`Cannot retry without section data`);
      }
    } else {
      if (this.config.url && !groupId) {
        groupId = parseInt(
          (this.config.url.toString().match(/https:\/\/[^0-9]+(\d+)/) || {
            1: ''
          })[1]
        );
      }
    }
    if (!groupId) {
      throw new Error('Group ID cannot be determined');
    }
    Debug.withGroupId(groupId, 'Start');

    if (!this.config.session) {
      let url = this.config.url;
      if (this.config.retry) {
        url = `https://${this.config.section?.Metadata.Host}/app/faculty#academicclass/${this.config.section?.GroupId}/0/bulletinboard`;
      }
      if (!url) {
        throw new Error(
          'An LMS URL is required to open a new datadirect session'
        );
      }
      Debug.withGroupId(groupId, 'Creating session');
      this.config.session = await PuppeteerSession.Fetchable.init(url, {
        logRequests: Workflow.logRequests()
      });
    } else {
      Debug.withGroupId(groupId, 'Forking session in new window');
      this.config.session = await this.config.session.fork(
        `/app/faculty#academicclass/${groupId}/0/bulletinboard`
      );
    }

    const Start = new Date();

    const areaConfig = { ...this.config, groupId };

    const [SectionInfo, BulletinBoard, Topics, Assignments, Gradebook] =
      await Promise.all([
        Area.SectionInfo.snapshot(areaConfig, this.config.section?.SectionInfo),
        this.config.bulletinBoard
          ? Area.BulletinBoard.snaphot(
              areaConfig,
              this.config.section?.BulletinBoard
            )
          : undefined,
        this.config.topics
          ? Area.Topics.snapshot(areaConfig, this.config.section?.Topics)
          : undefined,
        this.config.assignments
          ? await Area.Assignments.snapshot(
              areaConfig,
              this.config.section?.Assignments
            )
          : undefined,
        this.config.gradebook
          ? Area.GradeBook.snapshot(areaConfig, this.config.section?.Gradebook)
          : undefined
      ]);

    const snapshot: Data = {
      Metadata: {
        Host:
          this.config.section?.Metadata.Host ||
          (await this.config.session.url()).host,
        User: await this.config.session.user(),
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

    if (this.config.outputPath) {
      let basename = 'snapshot.json';
      if (snapshot.SectionInfo) {
        basename = Output.pathsafeFilename(
          `${[snapshot.SectionInfo.SchoolYear, snapshot.SectionInfo.Teacher, snapshot.SectionInfo.GroupName, snapshot.SectionInfo.Id].filter((term) => !!term).join(' - ')}.json`
        );
      }
      const filepath = await Output.avoidOverwrite(
        Output.filePathFromOutputPath(this.config.outputPath, basename)
      );
      Output.writeJSON(filepath, snapshot, {
        silent: this.config.silent,
        pretty: Output.pretty()
      });

      if (this.config.metadata) {
        Output.writeJSON(
          filepath.replace(/\.json$/, '.metadata.json'),
          {
            ...snapshot.Metadata,
            serverRequests: RateLimiter.requests(),
            serverRequestsPerSecond: RateLimiter.actual(),
            ...this.config,
            session: undefined
          },
          { silent: this.config.silent, pretty: Output.pretty() }
        );
      }
    }

    if (PuppeteerSession.quit()) {
      await this.config.session.close();
    }

    if (this.config.section) {
      const stringified = JSON.parse(JSON.stringify(snapshot)) as Data<
        string,
        string
      >;
      return {
        ...unmatchedProperties(this.config.section, stringified),
        ...stringified
      };
    }
    return snapshot;
  }
}
