import cli from '@battis/qui-cli';
import * as common from '../../../common.js';

export const defaults = {
  snapshotOptions: {
    bulletinBoard: true,
    topics: true,
    assignments: true,
    gradebook: true,
    studentData: false,
    payload: {
      active: true,
      future: true,
      expired: true
    }
  },
  all: false
};

export const flags = {
  ...common.Args.flags,
  all: {
    short: 'A',
    description: `Capture all sections (default: ${cli.colors.value(defaults.all)}, positional argument ${cli.colors.value(`arg0`)} is used to identify MySchoolApp instance)`,
    default: defaults.all
  },
  active: {
    description: `Show currently active items (default: ${cli.colors.value(defaults.snapshotOptions.payload.active)})`,
    default: defaults.snapshotOptions.payload.active
  },
  future: {
    description: `Show future items (default: ${cli.colors.value(defaults.snapshotOptions.payload.future)})`,
    default: defaults.snapshotOptions.payload.future
  },
  expired: {
    description: `Show expired items (default: ${cli.colors.value(defaults.snapshotOptions.payload.expired)})`,
    default: defaults.snapshotOptions.payload.expired
  },
  bulletinBoard: {
    description: `Include the course Bulletin Board in the snapshot (default ${cli.colors.value(defaults.snapshotOptions.bulletinBoard)})`,
    short: 'b',
    default: defaults.snapshotOptions.bulletinBoard
  },
  topics: {
    description: `Include the course Topics in the snapshot (default ${cli.colors.value(defaults.snapshotOptions.topics)})`,
    short: 't',
    default: defaults.snapshotOptions.topics
  },
  assignments: {
    short: 'a',
    description: `Include the course Assignments in the snapshot (default ${cli.colors.value(defaults.snapshotOptions.assignments)})`,
    default: defaults.snapshotOptions.assignments
  },
  gradebook: {
    description: `Include the course Gradebook in the snapshot (default ${cli.colors.value(defaults.snapshotOptions.gradebook)})`,
    short: 'g',
    default: defaults.snapshotOptions.gradebook
  },
  studentData: {
    description: `Include student data in the course snapshot (default ${cli.colors.value(defaults.snapshotOptions.studentData)}, i.e. ${cli.colors.value('--no-studentData')} which preempts any other flags that have been set)`,
    default: defaults.snapshotOptions.studentData
  }
};
