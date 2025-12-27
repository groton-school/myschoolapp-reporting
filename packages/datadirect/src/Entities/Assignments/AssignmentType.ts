export type AssignmentType = {
  AssignmentTypeId: number;
  Type: string;
  Major: boolean;
  Inactive: boolean;
  UsedOnAssignment: boolean;
  UsedInGradeBook: boolean;
  MarkingPeriodId: number;
  Percentage: number;
  MarkingPeriodCum: number;
  YearCum: number;
  DefaultMaxPoints: number;
};
