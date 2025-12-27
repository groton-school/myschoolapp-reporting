import { HTMLString } from '@battis/descriptive-types';

export type Option = {
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  IsCorrect: boolean;
  SortOrder: number;
  Description: HTMLString;
  Selected: boolean;
  NumberSelected: number;
  PercentSelected: number;
  DisplayOrder: number;
  SelectedMatchId: number;
};
