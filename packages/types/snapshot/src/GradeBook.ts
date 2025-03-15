import { api } from 'datadirect';

export type Item = {
  markingPeriod: api.datadirect.GradeBookMarkingPeriodList.Item;
  gradebook: Omit<api.gradebook.hydrategradebook.Response, 'Roster'> & {
    Roster: api.gradebook.hydrategradebook.Roster | { error: string };
  };
};

export type Data = Item[];
