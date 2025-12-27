export type Option = {
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  IsCorrect: boolean;
  SortOrder: number;
  Description: 'True' | 'False';
  Selected: boolean;
  NumberSelected: number;
  PercentSelected: number;
  DisplayOrder: number;
  SelectedMatchId: number;
};
