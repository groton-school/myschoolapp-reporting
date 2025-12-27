import { HTMLString } from '@battis/descriptive-types';
import { Option } from './Option.js';

export type Answer = {
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  IsCorrect: boolean;
  SortOrder: number;
  Description: HTMLString;
  Selected: boolean;
  NumberSelected: number;
  PercentSelected: number;
  DisplayOrder: number;
  MatchingAnswer: Option;
  SelectedMatchId: number;
};
