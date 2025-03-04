import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import * as Plugin from '@battis/qui-cli.plugin';
import { Output } from '@msar/output';
import { api } from 'datadirect';
import path from 'node:path';
import ora from 'ora';
import * as All from './Manager/All.js';
import * as Single from './Manager/Single.js';

export { All, Single };

export type Configuration = Plugin.Configuration &
  Single.SnapshotOptions &
  All.AllOptions;

Core.configure({ core: { requirePositionals: true } });

export const name = '@msar/snapshot';
export const src = import.meta.dirname;

let snapshotOptions: Single.SnapshotOptions = {
  bulletinBoard: true,
  topics: true,
  assignments: true,
  gradebook: true,
  studentData: true,
  payload: {
    format: 'json',
    active: true,
    future: true,
    expired: true
  }
};

let allOptions: All.AllOptions = {
  association: undefined,
  termsOffered: undefined,
  year: `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`,
  groupsPath: undefined
};
if (new Date().getMonth() <= 6) {
  allOptions.year = `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`;
}

let url: string | URL | undefined = undefined;

let all = false;
let fromDate = new Date().toLocaleDateString('en-US');
let contextLabelId = 2;

function hydrate<T extends Record<string, any>>(
  proposal: T,
  fallback: T,
  keys: (keyof T)[],
  base: T
) {
  const result: T = { ...base };
  for (const key of keys) {
    result[key] = Plugin.hydrate(proposal[key], fallback[key]);
  }
  return result;
}

export function configure(config: Configuration = {}) {
  snapshotOptions = hydrate(
    config,
    snapshotOptions,
    ['bulletinBoard', 'topics', 'assignments', 'gradebook', 'studentData'],
    {}
  );

  const payload: api.datadirect.ContentItem.Payload = { format: 'json' };
  snapshotOptions.payload = hydrate(
    config.payload || payload,
    snapshotOptions.payload || payload,
    ['active', 'future', 'expired'],
    payload
  );

  allOptions = hydrate(
    config,
    allOptions,
    ['association', 'termsOffered', 'year', 'groupsPath'],
    {}
  );

  all = Plugin.hydrate(config.all, all);
  fromDate = Plugin.hydrate(config.fromDate, fromDate);
  contextLabelId = Plugin.hydrate(config.contextLabelId, contextLabelId);
}

export function options(): Plugin.Options {
  const outputOptions = Output.options();
  return {
    flag: {
      all: {
        short: 'A',
        description: `Capture all sections (default: ${Colors.value(all)}, positional argument ${Colors.value(`arg0`)} is used to identify MySchoolApp instance)`,
        default: all
      },
      active: {
        description: `Show currently active items (default: ${Colors.value(snapshotOptions.payload?.active)})`,
        default: snapshotOptions.payload?.active
      },
      future: {
        description: `Show future items (default: ${Colors.value(snapshotOptions.payload?.future)})`,
        default: snapshotOptions.payload?.future
      },
      expired: {
        description: `Show expired items (default: ${Colors.value(snapshotOptions.payload?.expired)})`,
        default: snapshotOptions.payload?.expired
      },
      bulletinBoard: {
        description: `Include the course Bulletin Board in the snapshot (default ${Colors.value(snapshotOptions.bulletinBoard)})`,
        short: 'b',
        default: snapshotOptions.bulletinBoard
      },
      topics: {
        description: `Include the course Topics in the snapshot (default ${Colors.value(snapshotOptions.topics)})`,
        short: 't',
        default: snapshotOptions.topics
      },
      assignments: {
        short: 'a',
        description: `Include the course Assignments in the snapshot (default ${Colors.value(snapshotOptions.assignments)})`,
        default: snapshotOptions.assignments
      },
      gradebook: {
        description: `Include the course Gradebook in the snapshot (default ${Colors.value(snapshotOptions.gradebook)})`,
        short: 'g',
        default: snapshotOptions.gradebook
      },
      studentData: {
        description: `Include student data in the course snapshot (default ${Colors.value(snapshotOptions.studentData)}, i.e. ${Colors.value('--no-studentData')} which preempts any other flags that have been set)`,
        default: snapshotOptions.studentData
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
        description: `Starting date for date-based filter where relevant (default is today's date: ${Colors.quotedValue(`"${fromDate}"`)})`,
        default: fromDate
      },
      toDate: {
        description: `ending date for data-based filter where relevant`
      },
      association: {
        description: `Comma-separated list of group associations to include if ${Colors.value('--all')} flag is used. Possible values: ${Output.oxfordComma(
          [
            'Activities',
            'Advisories',
            'Classes',
            'Community Groups',
            'Dorms',
            'Teams'
          ].map((assoc) => Colors.quotedValue(`"${assoc}"`))
        )}`
      },
      termsOffered: {
        description: `Comma-separated list of terms to include if ${Colors.value('--all')} flag is used`
      },
      groupsPath: {
        description: `Path to output directory or file to save filtered groups listing (include placeholder ${Colors.quotedValue('"%TIMESTAMP%"')} to specify its location, otherwise it is added automatically when needed to avoid overwriting existing files)`
      },
      year: {
        description: `If ${Colors.value(`--all`)} flag is used, which year to download. (Default: ${Colors.quotedValue(`"${allOptions.year}"`)})`,
        default: allOptions.year
      }
    },
    num: {
      contextLabelId: {
        description: `(default: ${Colors.value(contextLabelId)})`,
        default: contextLabelId
      }
    },
    man: [
      {
        text: `Capture a JSON snapshot of an individual course or of a collection of courses (using the ${Colors.value('--all')} flag). In addition to relevant flags and options, the only argument expected is a URL (${Colors.value('arg0')}) to a page within the target course (or target LMS instance, if snapshotting more than one course).`
      }
    ]
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  const {
    positionals: [_url]
  } = args;
  if (!_url) {
    throw new Error(`Expected arg0 (URL) not defined`);
  }
  url = new URL(_url);
  configure(args.values);
}

export async function run() {
  if (!url) {
    throw new Error(
      `${Colors.value('arg0')} must be the URL of an LMS instance`
    );
  }

  if (all) {
    await All.snapshot({
      url,
      ...snapshotOptions,
      ...allOptions,
      ...options
    });
  } else {
    const spinner = ora();
    spinner.start(`Capturing snapshot from ${Colors.url(url)}`);
    const snapshot = await Single.snapshot({
      url,
      ...snapshotOptions,
      ...options
    });
    spinner.succeed(
      `Captured snapshot of ${snapshot?.SectionInfo?.Teacher}'s ${snapshot?.SectionInfo?.SchoolYear} ${snapshot?.SectionInfo?.Duration} ${snapshot?.SectionInfo?.GroupName}`
    );
  }
}
