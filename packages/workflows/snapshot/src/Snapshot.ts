import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import '@battis/qui-cli.env';
import * as Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import { Output } from '@msar/output';
import * as Snapshot from '@msar/types.snapshot';
import fs from 'node:fs';
import path from 'node:path';
import * as Section from './Section.js';
import { Configuration } from './Section.js';
import * as SkyAPI from './SkyAPI.js';

export { Configuration, Context } from './Section.js';

Core.configure({ core: { requirePositionals: true } });

export const name = '@msar/snapshot';
export const src = import.meta.dirname;

let config: Configuration = {
  url: undefined,
  session: undefined,
  groupId: undefined,
  bulletinBoard: true,
  topics: true,
  gradebook: true,
  assignments: true,
  studentData: true,
  payload: {
    format: 'json',
    active: true,
    future: true,
    expired: true
  },
  fromDate: new Date().toLocaleDateString('en-US'),
  toDate: undefined,
  contextLabelId: 2,
  metadata: true,
  retry: false
};

export function getConfig() {
  return { ...config };
}

export function configure(proposal: Configuration = {}) {
  config = {
    session: Plugin.hydrate(proposal.session, config.session),
    groupId: Plugin.hydrate(proposal.groupId, config.groupId),
    url: proposal.url ? proposal.url : config.url,

    bulletinBoard: Plugin.hydrate(proposal.bulletinBoard, config.bulletinBoard),
    topics: Plugin.hydrate(proposal.topics, config.topics),
    assignments: Plugin.hydrate(proposal.assignments, config.assignments),
    gradebook: Plugin.hydrate(proposal.gradebook, config.gradebook),
    studentData: Plugin.hydrate(proposal.studentData, config.studentData),

    payload: Plugin.hydrate(
      {
        format: proposal.format,
        active: proposal.active,
        future: proposal.future,
        expired: proposal.expired,
        ...proposal.payload
      },
      config.payload
    ),

    fromDate: Plugin.hydrate(proposal.fromDate, config.fromDate),
    toDate: Plugin.hydrate(proposal.toDate, config.toDate),
    contextLabelId: Plugin.hydrate(
      proposal.contextLabelId,
      config.contextLabelId
    ),

    metadata: Plugin.hydrate(proposal.metadata, config.metadata),
    retry: Plugin.hydrate(proposal.retry, config.retry)
  };
}

export function options(): Plugin.Options {
  /*
   * TODO add snapshot retry option
   *   This needs to happen *before* adding any new tweaks to snapshot
   *   algorithm, so that any subsequent tweaks can be checked for and run
   *   on retry. Also, any results that yielded an error should be retried.
   *   But all updates conforming to @msar/types.import need to be preserved!
   */
  const outputOptions = Output.options();
  return {
    flag: {
      active: {
        description: `Show currently active items (default: ${Colors.value(config.payload?.active)})`,
        default: config.payload?.active
      },
      future: {
        description: `Show future items (default: ${Colors.value(config.payload?.future)})`,
        default: config.payload?.future
      },
      expired: {
        description: `Show expired items (default: ${Colors.value(config.payload?.expired)})`,
        default: config.payload?.expired
      },
      bulletinBoard: {
        description: `Include the course Bulletin Board in the snapshot (default ${Colors.value(config.bulletinBoard)})`,
        short: 'b',
        default: config.bulletinBoard
      },
      topics: {
        description: `Include the course Topics in the snapshot (default ${Colors.value(config.topics)})`,
        short: 't',
        default: config.topics
      },
      assignments: {
        short: 'a',
        description: `Include the course Assignments in the snapshot (default ${Colors.value(config.assignments)})`,
        default: config.assignments
      },
      gradebook: {
        description: `Include the course Gradebook in the snapshot (default ${Colors.value(config.gradebook)})`,
        short: 'g',
        default: config.gradebook
      },
      studentData: {
        description: `Include student data in the course snapshot (default ${Colors.value(config.studentData)}, i.e. ${Colors.value('--no-studentData')} which preempts any other flags that have been set)`,
        default: config.studentData
      },
      metadata: {
        description: `Include additional ${Colors.value(':SnapshotName.metadata.json')} recording the parameters of the snapshot command. (default ${Colors.value(config.metadata)}, use ${Colors.value('--no-metadata')} to disable)`,
        default: config.metadata
      },
      retry: {
        description: `Retry a previous snapshot. If this flag is set, ${Colors.value('arg0')} must be the path to an existing snapshot JSON file.`
      }
    },
    opt: {
      outputPath: {
        ...outputOptions.opt?.outputPath,
        description: outputOptions.opt?.outputPath.description
          ?.replace(
            outputOptions.opt?.outputPath.description,
            path.resolve(
              Root.path(),
              outputOptions.opt?.outputPath.description,
              ':SnapshotName.json'
            )
          )
          .replace(
            /\)$/,
            ` where ${Colors.value(':SnapshotName')} is either the name of the course in ${Colors.quotedValue(`":Year - :Teacher - :CourseTitle - :SectionId"`)} format for a single section or group or ${Colors.quotedValue(`"snapshot"`)} if the ${Colors.value('--all')} flag is set. ${Colors.url(':SnapshotName.metadata.json')} is also output, recording the parameters of the snapshot command.)`
          )
      },
      fromDate: {
        description: `Starting date for date-based filter where relevant (default is today's date: ${Colors.quotedValue(`"${config.fromDate}"`)})`,
        default: config.fromDate
      },
      toDate: {
        description: `ending date for data-based filter where relevant`
      }
    },
    man: [
      {
        text: `Capture a JSON snapshot of an individual course. In addition to relevant flags and options, the only argument expected is a URL (${Colors.value('arg0')}) to a page within the target course.`
      }
    ]
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  const {
    positionals: [url]
  } = args;
  SkyAPI.init({
    client_id: process.env.SKY_CLIENT_ID!,
    client_secret: process.env.SKY_CLIENT_SECRET!,
    subscription_key: process.env.SKY_SUBSCRIPTION_KEY!,
    redirect_uri: process.env.SKY_REDIRECT_URI!
  });
  configure({ ...args.values, url });
}

export async function run() {
  if (!config.url) {
    if (config.retry) {
      throw new Error(
        `${Colors.value('arg0')} must be a path to an existing snapshot JSON file`
      );
    } else {
      throw new Error(
        `${Colors.value('arg0')} must be the URL of an LMS instance`
      );
    }
  }
  let section: Snapshot.Data | undefined = undefined;
  if (config.retry) {
    section = JSON.parse(
      fs.readFileSync(path.resolve(Root.path(), config.url)).toString()
    );
  }
  await snapshot({ ...config, outputPath: Output.outputPath(), section });
}

export async function snapshot(conf?: Configuration) {
  return await Section.Snapshot.capture(conf || config);
}
