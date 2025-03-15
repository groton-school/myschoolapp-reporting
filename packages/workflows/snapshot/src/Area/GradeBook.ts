import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import * as Snapshot from '@msar/types.snapshot';
import * as Base from './Base.js';

export const snapshot: Base.Snapshot<Snapshot.GradeBook.Data> = async ({
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
    const Gradebook: Snapshot.GradeBook.Data = [];
    for (const markingPeriod of markingPeriods) {
      const entry: Snapshot.GradeBook.Item = {
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
