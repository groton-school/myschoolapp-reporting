import { DateTimeString, TimeString } from '@battis/descriptive-types';

export type Assignment = {
  AssignmentId: number;
  AssignmentTypeId: number;
  AssignmentType: string;
  ShortDescription: string;
  IncGradeBook: boolean;
  MaxPoints: number;
  Factor: number;
  ExtraCredit: boolean;
  IncCumGrade: boolean;
  PublishGrade: boolean;
  OnPaperSubmission: boolean;
  DropboxInd: boolean;
  DropboxNumFiles: number;
  DropboxResub: boolean;
  LocalNow: DateTimeString;
  AssignmentStatus: number;
  HasGrade: number;
  MissingInd: number;
  ExemptInd: number;
  IncompleteInd: number;
  LateInd: number;
  DropboxTimeLate: TimeString;
  SchoolId: number;
  SectionLinks: any[]; // TODO DataDirect/common/ContentItem/Assignment.SectionLinks type
  DownloadItems: any[]; // TODO DataDirect/common/ContentItem/Assignment.DownloadItems type
  LinkItems: any[]; // TODO DataDirect/common/ContentItem/Assignment.LinkItems type
  HasGrades: boolean;
  AssessmentInd: boolean;
  MaxScore: number;
  MaxScoreInd: number;
  TimeToComplete: number;
  NumberOfAttempts: number;
  RandomizeQuestions: boolean;
  AssessmentId: number;
  QuestionsTogether: boolean;
  DiscussionInd: boolean;
  ShareDiscussion: boolean;
  AlwaysShowDiscussion: boolean;
  AllowDiscussionAttach: boolean;
  SaveForLater: boolean;
  Lti: any[]; // TODO DataDirect/common/ContentItem/Assignment.Lti type
  RubricId: number;
  ParentRubricId: number;
  AssignmentRubricLocked: boolean;
  EvaluationMethod: number;
  HasCompetencyGrades: number;
  FormativeInd: boolean;
  DefaultDateAssigned: DateTimeString;
  DefaultDateDue: DateTimeString;
  DefaultIndex: number;
  Selected: boolean;
  TopicSectionCount: number;
  NewAssessmentInd: boolean;
  RandomizeMultipleChoice: boolean;
  ShowResultsPage: boolean;
  ShowAfterOneAttempt: boolean;
  ShowTimeUsed: boolean;
  ShowTakeAgain: boolean;
  ShowQuestions: boolean;
  ShowPointsEarned: boolean;
  ShowCorrectAnswer: boolean;
  AllowStudentsResume: boolean;
  ShowQuestionsUntil: number;
  ShowQuestionsUntilDate: null;
};

export type Content = Assignment[];
