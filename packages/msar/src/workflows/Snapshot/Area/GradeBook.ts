import cli from '@battis/qui-cli';
import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import * as Base from './Base.js';

export type Item = {
  markingPeriod: types.datadirect.GradeBookMarkingPeriodList.Item;
  gradebook: Omit<types.gradebook.hydrategradebook.Response, 'Roster'> & {
    Roster: types.gradebook.hydrategradebook.Roster | { error: string };
  };
};

export type Data = Item[];

export const snapshot: Base.Snapshot<Data> = async ({
  groupId: sectionId,
  ignoreErrors,
  studentData,
  ...options
}) => {
  cli.log.debug(`Group ${sectionId}: Start capturing gradebook`);
  try {
    const markingPeriods = await api.datadirect.GradeBookMarkingPeriodList({
      ...options,
      payload: { sectionId }
    });
    const Gradebook: Data = [];
    for (const markingPeriod of markingPeriods) {
      const entry: Item = {
        markingPeriod,
        gradebook: await api.gradebook.hydrategradebook({
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
    cli.log.debug(`Group ${sectionId}: Gradebook captured`);
    return Gradebook;
  } catch (error) {
    const message = `Group ${sectionId}: Error capturing gradebook: ${cli.colors.error(error || 'unknown')}`;
    if (ignoreErrors) {
      cli.log.error(message);
      return undefined;
    } else {
      throw new Error(message);
    }
  }
};
