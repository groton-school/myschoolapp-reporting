import { Endpoints, Entities } from 'datadirect';

export type Item = {
  markingPeriod: Endpoints.API.DataDirect.GradeBookMarkingPeriodList.Item;
  gradebook: Omit<Entities.Gradebook.Gradebook, 'Roster'> & {
    Roster: Entities.Gradebook.Roster | { error: string };
  };
};

export type Data = Item[];
