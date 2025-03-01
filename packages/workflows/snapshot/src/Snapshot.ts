import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import { Output } from '@msar/output';
import path from 'node:path';
import ora from 'ora';
import * as Args from './Args.js';
import * as All from './Manager/All.js';
import * as Single from './Manager/Single.js';

export { All, Args, Single };

export const name = '@msar/snapshot';
export const src = import.meta.dirname;

let bulletinBoard = true;
let topics = true;
let assignments = true;
let gradebook = true;
let studentData = false;
let active = true;
let future = true;
let expired = true;
let all = false;
let fromDate = new Date().toLocaleDateString('en-US');
let contextLabelId = 2;
let year = `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`;
if (new Date().getMonth() <= 6) {
  year = `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`;
}

export function options(): Plugin.Options {
  return {
    flag: {
      all: {
        short: 'A',
        description: `Capture all sections (default: ${Colors.value(all)}, positional argument ${Colors.value(`arg0`)} is used to identify MySchoolApp instance)`,
        default: all
      },
      active: {
        description: `Show currently active items (default: ${Colors.value(active)})`,
        default: active
      },
      future: {
        description: `Show future items (default: ${Colors.value(future)})`,
        default: future
      },
      expired: {
        description: `Show expired items (default: ${Colors.value(expired)})`,
        default: expired
      },
      bulletinBoard: {
        description: `Include the course Bulletin Board in the snapshot (default ${Colors.value(bulletinBoard)})`,
        short: 'b',
        default: bulletinBoard
      },
      topics: {
        description: `Include the course Topics in the snapshot (default ${Colors.value(topics)})`,
        short: 't',
        default: topics
      },
      assignments: {
        short: 'a',
        description: `Include the course Assignments in the snapshot (default ${Colors.value(assignments)})`,
        default: assignments
      },
      gradebook: {
        description: `Include the course Gradebook in the snapshot (default ${Colors.value(gradebook)})`,
        short: 'g',
        default: gradebook
      },
      studentData: {
        description: `Include student data in the course snapshot (default ${Colors.value(studentData)}, i.e. ${Colors.value('--no-studentData')} which preempts any other flags that have been set)`,
        default: studentData
      }
    },
    opt: {
      outputPath: {
        ...common.Args.options.outputPath,
        description: common.Args.options.outputPath?.description
          .replace(
            common.Args.defaults.outputOptions.outputPath,
            path.resolve(
              process.cwd(),
              common.Args.defaults.outputOptions.outputPath,
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
        description: `If ${Colors.value(`--all`)} flag is used, which year to download. (Default: ${Colors.quotedValue(`"${year}"`)})`,
        default: year
      }
    },
    num: {
      contextLabelId: {
        description: `(default: ${Colors.value(contextLabelId)})`,
        default: contextLabelId
      }
    }
  };
}

export async function run(
  url?: URL | string,
  args: Args.Parsed = Args.defaults
) {
  const { all, snapshotOptions, allOptions, ...options } = args;

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
