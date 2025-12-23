import { Output } from '@msar/output';
import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import '@qui-cli/env-1password';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import * as Section from './Section.js';
import { Configuration } from './Section.js';

Output.outputPathDescription(
  `Path to output directory or file to save command output (default: ${Colors.quotedValue(
    `"${Output.outputPath()}:Snapshot.json"`
  )},  where ${Colors.value(
    ':SnapshotName'
  )} is either the name of the course in ${Colors.quotedValue(
    `":Year - :Teacher - :CourseTitle - :SectionId"`
  )} format for a single section or group or ${Colors.quotedValue(
    `"snapshot"`
  )} if the ${Colors.value('--all')} flag is set. ${Colors.url(
    ':SnapshotName.metadata.json'
  )} is also output, recording the parameters of the snapshot command. Will use the value in environment variable ${Colors.value(
    'OUTPUT_PATH'
  )} if present)`
);

const COURSE_URL = 'url';

export { Configuration, Context } from './Section.js';

export const name = '@msar/snapshot';

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
  metadata: true
};

export function getConfig() {
  return { ...config };
}

export function configure(proposal: Configuration = {}) {
  config = {
    session: Plugin.hydrate(proposal.session, config.session),
    groupId: Plugin.hydrate(proposal.groupId, config.groupId),
    url: proposal.url ? new URL(proposal.url) : config.url,

    bulletinBoard: Plugin.hydrate(proposal.bulletinBoard, config.bulletinBoard),
    topics: Plugin.hydrate(proposal.topics, config.topics),
    assignments: Plugin.hydrate(proposal.assignments, config.assignments),
    gradebook: Plugin.hydrate(proposal.gradebook, config.gradebook),
    studentData: Plugin.hydrate(proposal.studentData, config.studentData),

    payload: Plugin.hydrate(
      {
        format: proposal.format!,
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

    metadata: Plugin.hydrate(proposal.metadata, config.metadata)
  };
}

export function options(): Plugin.Options {
  Positionals.require({
    [COURSE_URL]: {
      description: `The URL of a page within the target course`
    }
  });
  Positionals.allowOnlyNamedArgs();

  /*
   * TODO add snapshot retry option
   *   This needs to happen *before* adding any new tweaks to snapshot
   *   algorithm, so that any subsequent tweaks can be checked for and run
   *   on retry. Also, any results that yielded an error should be retried.
   *   But all updates conforming to @msar/types.import need to be preserved!
   */
  return {
    man: [
      { level: 1, text: 'Snapshot options' },
      {
        text: `Capture a JSON snapshot of an individual course. In addition to relevant flags and options, the only argument expected is a ${Colors.positionalArg('url')} to a page within the target course.`
      }
    ],
    flag: {
      active: {
        description: `Show currently active items`,
        default: config.payload?.active
      },
      future: {
        description: `Show future items`,
        default: config.payload?.future
      },
      expired: {
        description: `Show expired items`,
        default: config.payload?.expired
      },
      bulletinBoard: {
        description: `Include the course Bulletin Board in the snapshot`,
        short: 'b',
        default: config.bulletinBoard
      },
      topics: {
        description: `Include the course Topics in the snapshot`,
        short: 't',
        default: config.topics
      },
      assignments: {
        short: 'a',
        description: `Include the course Assignments in the snapshot`,
        default: config.assignments
      },
      gradebook: {
        description: `Include the course Gradebook in the snapshot`,
        short: 'g',
        default: config.gradebook
      },
      studentData: {
        description: `Include student data in the course snapshot`,
        default: config.studentData
      },
      metadata: {
        description: `Include additional ${Colors.value(':SnapshotName.metadata.json')} recording the parameters of the snapshot command.`,
        default: config.metadata
      }
    },
    opt: {
      fromDate: {
        description: `Starting date for date-based filter where relevant`,
        default: config.fromDate
      },
      toDate: {
        description: `ending date for data-based filter where relevant`
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  const url = Positionals.get(COURSE_URL);
  configure({ ...values, url });
}

export async function run() {
  if (!config.url) {
    throw new Error(
      `${Colors.positionalArg('url')} must be the URL of an LMS instance`
    );
  }
  try {
    await snapshot({ ...config, outputPath: Output.outputPath() });
  } catch (error) {
    Log.error({ error });
  }
}

export async function snapshot(conf?: Configuration) {
  return await Section.Snapshot.capture(conf || config);
}

export function getUrl() {
  return config.url;
}
