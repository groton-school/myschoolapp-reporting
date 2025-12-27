import { NumericBoolean } from '@battis/descriptive-types';

export type Item = {
  SectionId: number;
  Name: string;
  OfferingId: number;
  isCurrent: NumericBoolean;
  LevelNum: number;
};

export type Response = Item[];
