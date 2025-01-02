import { PuppeteerSession } from 'datadirect-puppeteer';
import * as common from '../../../common.js';
import * as Manager from '../Manager.js';

export type Parsed = common.args.Parsed & {
  snapshotOptions?: Manager.Single.SnapshotOptions;
  all?: boolean;
  allOptions?: Manager.All.AllOptions;
  credentials?: PuppeteerSession.Credentials;
  puppeteerOptions?: PuppeteerSession.Options;
};

export function parse(values: Record<string, any>): Parsed {
  const {
    groupsPath,
    association,
    termsOffered,
    year,
    format = 'json',
    contextLabelId,
    editMode,
    active,
    future,
    expired,
    fromDate,
    toDate
  } = values;

  return {
    snapshotOptions: {
      bulletinBoard: !!values.bulletinBoard,
      topics: !!values.topics,
      assignments: !!values.assignments,
      gradebook: !!values.gradebook,
      studentData: !!values.studentData,
      payload: {
        format,
        contextLabelId,
        editMode,
        active,
        future,
        expired,
        fromDate,
        toDate
      }
    },
    all: !!values.all,
    allOptions: {
      association,
      termsOffered,
      year,
      groupsPath
    },
    ...common.args.parse(values)
  };
}
