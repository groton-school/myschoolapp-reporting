import { Debug } from '@msar/debug';
import { api } from 'datadirect';
import { DatadirectPuppeteer } from 'datadirect-puppeteer';
import * as Base from './Base.js';

export type Item = {
  markingPeriod: api.datadirect.GradeBookMarkingPeriodList.Item;
  gradebook: Omit<api.gradebook.hydrategradebook.Response, 'Roster'> & {
    Roster: api.gradebook.hydrategradebook.Roster | { error: string };
  };
};

export type Data = Item[];

export const snapshot: Base.Snapshot<Data> = async ({
  groupId: sectionId,
  ignoreErrors,
  studentData,
  ...options
}) => {
  Debug.withGroupId(sectionId, 'Start capturing gradebook');
  try {
    const markingPeriods =
      await DatadirectPuppeteer.api.datadirect.GradeBookMarkingPeriodList({
        ...options,
        payload: { sectionId }
      });
    const Gradebook: Data = [];
    for (const markingPeriod of markingPeriods) {
      const entry: Item = {
        markingPeriod,
        gradebook: await DatadirectPuppeteer.api.gradebook.hydrategradebook({
          ...options,
          payload: {
            sectionId,
            markingPeriodId: markingPeriod.MarkingPeriodId
          }
        })
      };
      if (!studentData) {
        entry.gradebook.Roster = { error: new Base.StudentDataError().message };
      }
      Gradebook.push(entry);
    }
    Debug.withGroupId(sectionId, 'Gradebook captured');
    return Gradebook;
  } catch (error) {
    if (ignoreErrors) {
      Debug.errorWithGroupId(
        sectionId,
        'Error capturing gradebook',
        error as string
      );
      return undefined;
    } else {
      throw error;
    }
  }
};
