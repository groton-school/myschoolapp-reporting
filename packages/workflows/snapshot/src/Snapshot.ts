import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import * as Plugin from '@battis/qui-cli.plugin';
import { Output } from '@msar/output';
import { api } from 'datadirect';
import path from 'node:path';
import ora from 'ora';
import * as All from './Manager/All.js';
import * as Single from './Manager/Single.js';
import * as Storage from './Storage.js';

export { All, Single };

export type Configuration = Plugin.Configuration &
  Single.SnapshotOptions &
  All.AllOptions;

Core.configure({ core: { requirePositionals: true } });

export const name = '@msar/snapshot';
export const src = import.meta.dirname;

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
  const payload: api.datadirect.ContentItem.Payload = {
    format: 'json',
    active: config.active,
    expired: config.expired,
    future: config.future
  };
  Storage.snapshotOptions(
    hydrate(
      { payload, ...config },
      Storage.snapshotOptions(),
      [
        'bulletinBoard',
        'topics',
        'assignments',
        'gradebook',
        'studentData',
        'payload'
      ],
      {}
    )
  );

  Storage.allOptions(
    hydrate(
      config,
      Storage.allOptions(),
      ['association', 'termsOffered', 'year', 'groupsPath'],
      {}
    )
  );

  Storage.all(Plugin.hydrate(config.all, Storage.all()));
  Storage.fromDate(Plugin.hydrate(config.fromDate, Storage.fromDate));
  Storage.contextLabelId(
    Plugin.hydrate(config.contextLabelId, Storage.contextLabelId())
  );
}

export function options(): Plugin.Options {
  const outputOptions = Output.options();
  return {
    flag: {
      all: {
        short: 'A',
        description: `Capture all sections (default: ${Colors.value(Storage.all())}, positional argument ${Colors.value(`arg0`)} is used to identify MySchoolApp instance)`,
        default: Storage.all()
      },
      active: {
        description: `Show currently active items (default: ${Colors.value(Storage.snapshotOptions().payload?.active)})`,
        default: Storage.snapshotOptions().payload?.active
      },
      future: {
        description: `Show future items (default: ${Colors.value(Storage.snapshotOptions().payload?.future)})`,
        default: Storage.snapshotOptions().payload?.future
      },
      expired: {
        description: `Show expired items (default: ${Colors.value(Storage.snapshotOptions().payload?.expired)})`,
        default: Storage.snapshotOptions().payload?.expired
      },
      bulletinBoard: {
        description: `Include the course Bulletin Board in the snapshot (default ${Colors.value(Storage.snapshotOptions().bulletinBoard)})`,
        short: 'b',
        default: Storage.snapshotOptions().bulletinBoard
      },
      topics: {
        description: `Include the course Topics in the snapshot (default ${Colors.value(Storage.snapshotOptions().topics)})`,
        short: 't',
        default: Storage.snapshotOptions().topics
      },
      assignments: {
        short: 'a',
        description: `Include the course Assignments in the snapshot (default ${Colors.value(Storage.snapshotOptions().assignments)})`,
        default: Storage.snapshotOptions().assignments
      },
      gradebook: {
        description: `Include the course Gradebook in the snapshot (default ${Colors.value(Storage.snapshotOptions().gradebook)})`,
        short: 'g',
        default: Storage.snapshotOptions().gradebook
      },
      studentData: {
        description: `Include student data in the course snapshot (default ${Colors.value(Storage.snapshotOptions().studentData)}, i.e. ${Colors.value('--no-studentData')} which preempts any other flags that have been set)`,
        default: Storage.snapshotOptions().studentData
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
        description: `Starting date for date-based filter where relevant (default is today's date: ${Colors.quotedValue(`"${Storage.fromDate()}"`)})`,
        default: Storage.fromDate()
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
        description: `If ${Colors.value(`--all`)} flag is used, which year to download. (Default: ${Colors.quotedValue(`"${Storage.allOptions().year}"`)})`,
        default: Storage.allOptions().year
      }
    },
    num: {
      contextLabelId: {
        description: `(default: ${Colors.value(Storage.contextLabelId())})`,
        default: Storage.contextLabelId()
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
    positionals: [url]
  } = args;
  if (!url) {
    throw new Error(`Expected arg0 (URL) not defined`);
  }
  Storage.url(new URL(url));
  configure(args.values);
}

export async function run() {
  if (!Storage.url()) {
    throw new Error(
      `${Colors.value('arg0')} must be the URL of an LMS instance`
    );
  }

  if (Storage.all()) {
    await All.snapshot({ url: Storage.url()! });
  } else {
    const spinner = ora();
    spinner.start(`Capturing snapshot from ${Colors.url(Storage.url())}`);
    const snapshot = await Single.snapshot({
      outputPath: Output.outputPath(),
      ...options
    });
    spinner.succeed(
      `Captured snapshot of ${snapshot?.SectionInfo?.Teacher}'s ${snapshot?.SectionInfo?.SchoolYear} ${snapshot?.SectionInfo?.Duration} ${snapshot?.SectionInfo?.GroupName}`
    );
  }
}
