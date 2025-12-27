import { NumericBoolean } from '@battis/descriptive-types';

export type Item = {
  MarkingPeriodId: number;
  MarkingPeriodDescription: string;
  CurrentPeriod: NumericBoolean;
  LevelNum: number;
};

export type Response = Item[];
