import cli from '@battis/qui-cli';
import * as common from '../../../common.js';

export const defaults = {
  all: false,
  active: true,
  future: true,
  expired: true,
  bulletinBoard: true,
  topics: true,
  assignments: true,
  gradebook: true,
  studentData: false
};

export const flags = {
  ...common.Args.flags,
  all: {
    short: 'A',
    description: `Capture all sections (default: ${cli.colors.value(defaults.all)}, positional argument ${cli.colors.value(`arg0`)} is used to identify MySchoolApp instance)`,
    default: defaults.all
  },
  active: {
    description: `Show currently active items (default: ${cli.colors.value(defaults.active)})`,
    default: defaults.active
  },
  future: {
    description: `Show future items (default: ${cli.colors.value(defaults.future)})`,
    default: defaults.future
  },
  expired: {
    description: `Show expired items (default: ${cli.colors.value(defaults.expired)})`,
    default: defaults.expired
  },
  bulletinBoard: {
    description: `Include the course Bulletin Board in the snapshot (default ${cli.colors.value(defaults.bulletinBoard)})`,
    short: 'b',
    default: defaults.bulletinBoard
  },
  topics: {
    description: `Include the course Topics in the snapshot (default ${cli.colors.value(defaults.topics)})`,
    short: 't',
    default: defaults.topics
  },
  assignments: {
    short: 'a',
    description: `Include the course Assignments in the snapshot (default ${cli.colors.value(defaults.assignments)})`,
    default: defaults.assignments
  },
  gradebook: {
    description: `Include the course Gradebook in the snapshot (default ${cli.colors.value(defaults.gradebook)})`,
    short: 'g',
    default: defaults.gradebook
  },
  studentData: {
    description: `Include student data in the course snapshot (default ${cli.colors.value(defaults.studentData)}, i.e. ${cli.colors.value('--no-studentData')} which preempts any other flags that have been set)`,
    default: defaults.studentData
  }
};
