import {
  DateTimeString,
  HTMLString,
  TimeString
} from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';

// from topic.topicassignmentsget
export type Assignment = {
  AssignmentId: number;
  AssignmentTypeId: number;
  AssignmentType: string;
  ShortDescription: HTMLString;
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
  SectionLinks: JSONValue[]; // TODO DataDirect/topicassignmentsget.Response.SectionLinks type
  DownloadItems: JSONValue[]; // TODO DataDirect/topicassignmentsget.Response.DownloadItems type
  LinkItems: JSONValue[]; // TODO DataDirect/topicassignmentsget.Response.LinkItems type
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
  Lti: JSONValue[]; // TODO DataDirect/topicassignmentsget.Response.Lti type
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
  ShowQuestionsUntilDate: DateTimeString;
};

// from datadirect.importassignmentsget
export type Assignment_DataDirectImport = {
  assignment_id: number;
  assignment_index_id: number;
  date_assignedTicks: number;
  date_assigned: DateTimeString;
  date_dueTicks: number;
  date_due: DateTimeString;
  publish_ind: boolean;
  publish_on_assigned_ind: boolean;
  marking_period_id: number;
  title_no_html: string;
  assignment_title: HTMLString;
  inc_grade_book: boolean;
  abbr_description: string;
  max_points: number;
  factor: number;
  extra_credit: boolean;
  inc_cum_grade: boolean;
  publish_grade: boolean;
  on_paper_sub: boolean;
  drop_box_ind: boolean;
  assignment_type: string;
  major: boolean;
  assessment_id: number;
  assignment_type_id: number;
  discussion_ind: boolean;
  assessment_ind: boolean;
  brief: HTMLString;
  detail: HTMLString;
  formative_ind: boolean;
  new_assessment_ind: boolean;
};
