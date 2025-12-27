import { HTMLString, NumericString } from '@battis/descriptive-types';

export type Level = {
  Id: number;
  SkillId: number;
  Name: string;
  Description: HTMLString;
  Value: NumericString;
  SortOrder: number;
  Points: NumericString;
};
