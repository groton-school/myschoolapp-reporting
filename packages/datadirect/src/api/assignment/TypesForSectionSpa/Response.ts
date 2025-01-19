export type Item = {
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

export type Response = Item[];
