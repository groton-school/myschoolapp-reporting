import {
  DateTimeString,
  HTMLString,
  NumericString
} from '@battis/descriptive-types';

type Assignment = {
  AssignmentId: number;
  AssignmentIndexId: number;
  GroupName: string | null;
  AssignmentClassification: number;
  AssignmentClassificationDescription: string;
  AssignmentType: string;
  AssignmentName: string;
  LongDescription: HTMLString;
  AssignmentLabel: HTMLString;
  DateAssigned: DateTimeString & HTMLString;
  DateAssignedSort: DateTimeString;
  DateDue: DateTimeString & HTMLString;
  DateDueSort: DateTimeString;
  RubricInd: boolean;
  GradingStyle: number;
  GradingStyleDisplay: string;
  PublishStatus: number;
  GradedCount: NumericString;
  GradedCountSort: number;
  MissingCount: number;
  SubmissionCount: number;
  ShowCopyInd: boolean;
  GradeBookInd: boolean;
  PublishGradeInd: boolean;
  OnPaperSubmission: boolean;
  DropBoxInd: boolean;
  ShowDetailsInd: boolean;
  HasLinkInd: boolean;
  LevelNum: number;
  FormativeInd: boolean;
  OfferingId: number;
  SectionId: number;
  HasDownloadInd: boolean;
  LtiInd: boolean;
  CanEdit: boolean;
  AssessmentLocked: boolean;
  DisableDropdown: boolean;
  StagedGradesInd: boolean;
  PartialSection: boolean;
  PartialCount: number;
  AssignedTo: HTMLString;
  ShowAssignmentPreview: boolean;
  NewAssessmentInd: boolean;
  AssessmentId: number;
  SectionBlock: any | null; // TODO Assignent2/AssignmentCenterCourseListGet/Response.Assignment.SectionBlock type
};

type FilterSummary = {
  UserDefinedId: number;
  SummaryText: string;
  DoNotClear: boolean;
};

export type Response = {
  Results: Assignment[];
  TotalCount: number;
  TotalPages: number;
  AllRowsReturned: boolean;
  FilterSummaries: FilterSummary[];
};
