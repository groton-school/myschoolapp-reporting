import { NumericBoolean } from '@battis/descriptive-types';

// from datadirect.AssignmentSectionsForTeacher
export type Summary = {
  SectionId: number;
  Name: string;
  OfferingId: number;
  isCurrent: NumericBoolean;
  LevelNum: number;
};
