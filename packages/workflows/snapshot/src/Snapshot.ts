import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import * as Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import { Output } from '@msar/output';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import * as Section from './Section.js';
import { Configuration } from './Section.js';

export { Configuration, Context, Data, Metadata } from './Section.js';

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

    metadata: Plugin.hydrate(proposal.metadata, config.metadata)
  };
}

export function options(): Plugin.Options {
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
      }
    },
    opt: {
      outputPath: {
        ...outputOptions.opt?.outputPath,
        description: outputOptions.opt?.outputPath.description
          ?.replace(
            outputOptions.opt?.outputPath.description,
            path.resolve(
              process.cwd(),
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
  configure({ ...args.values, url });
}

export async function run() {
  if (!config.url) {
    throw new Error(
      `${Colors.value('arg0')} must be the URL of an LMS instance`
    );
  }

  const spinner = ora();
  spinner.start(`Capturing snapshot from ${Colors.url(config.url)}`);
  const snap = await snapshot();
  spinner.succeed(
    `Captured snapshot of ${snap?.SectionInfo?.Teacher}'s ${snap?.SectionInfo?.SchoolYear} ${snap?.SectionInfo?.Duration} ${snap?.SectionInfo?.GroupName}`
  );
}

export async function snapshot(conf?: Configuration) {
  return await Section.Snapshot.capture(conf || config);
}

export function load(filePath: string): Section.Data {
  filePath = path.resolve(Root.path(), filePath);
  return JSON.parse(fs.readFileSync(filePath).toString());
}
