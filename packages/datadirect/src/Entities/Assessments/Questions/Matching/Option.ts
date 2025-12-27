import { HTMLString } from '@battis/descriptive-types';

export type Option = {
  AssessmentQuestionAnswerMatchId: number;
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  SortOrder: number;
  Description: HTMLString;
  Selected: boolean;
  DisplayOrder: number;
};
