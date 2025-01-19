import {
  DateString,
  DateTimeString,
  HTMLString,
  NumericString,
  TimeString,
  URLString
} from '@battis/descriptive-types';

type Lti = {
  ProviderId: NumericString;
  ToolId: 154573;
  LaunchUrl: URLString;
  ConsumerKey: string;
  SharedSecret: string;
  LineItemResourceId: string;
  LineItemTag: string;
  fileSubmissionInd: number;
};

type Value<T> = { value: T };

type Time = {
  hour: number;
  minute: number;
  meridie: 'AM' | 'PM';
  timezone: number;
  /** c */
  iso8601: DateTimeString;
  /** G:i A */
  local: DateString;
  customFormat: string;
};

type MarkingPeriod = {
  MarkingPeriodId: number;
  MarkingPeriodDescription: string;
  /** j/n/Y g:i A */
  BeginDate: DateTimeString;
  /** j/n/Y g:i A */
  EndDate: DateTimeString;
  SectionId: number;
};

type SectionLink = {
  hasGrades: boolean;
  HasEvaluation: boolean;
  hasAssessmentResults: boolean | null;
  SectionName: string;
  AssignmentId: number;
  AssignmentIndexId: number;
  SectionId: number;
  OfferingId: number;
  /** m/d/Y */
  AssignmentDate: DateString;
  timeAssign: Time;
  /** G:i:s */
  AssignmentTime: TimeString;
  /** c */
  dateDue: DateTimeString;
  /** m/d/Y */
  DueDate: DateString;
  timeDue: Time;
  /** G:i:s */
  DueTime: TimeString;
  PublishInd: boolean;
  PublishOnAssignedInd: boolean;
  publishStatus: NumericString;
  defaultPublishStatus: NumericString;
  /** G:i:s */
  defaultTime: TimeString;
  /** G:i:s */
  defaultDueTime: TimeString;
  markingPeriods: MarkingPeriod[];
  notification: boolean;
  incGradebook: boolean;
  markingPeriodId: number;
  DropBoxSubmitted: boolean;
  PartialInd: boolean;
  PartialCount: number;
  UsersList: [];
};

type LinkItem = {
  LinkId: number;
  ShortDescription: string;
  urlDescription: URLString;
  Url: URLString;
  ContextValue: number;
  Delete: boolean;
};

type Assignment = {
  LongDescription: HTMLString;
  SendNotification: boolean;
  AssignmentId: number;
  ShortDescription: HTMLString;
  AssignmentTypeId: number;
  PublishGrade: boolean;
  IncCumGrade: boolean;
  ExtraCredit: boolean;
  /** max length 9 */
  AbbrDescription: string;
  'max-points': number;
  MaxPoints: number;
  Factor: number;
  RubricId: number;
  EvaluationMethod: number;
  AssignmentSkills: [];
  AssignmentCourses: [];
  'inc-rubric': boolean;
  IncRubric: boolean;
  gradebook_ind: boolean;
  IncGradebook: boolean;
  Lti: Lti[];
  'inc-gradebook-lti': boolean;
  OnPaperSubmission: Value<boolean>;
  DropboxInd: Value<boolean>;
  /** h:i:s A */
  DropboxTimeLate: TimeString;
  SectionLinks: SectionLink[];
  AssignmentUsers: [];
  DownloadItems: [];
  LinkItems: LinkItem[];
  notifBodyControl_ShortDescription: HTMLString;
  notifBodyControl_LongDescription: HTMLString;
  Notifications: number[];
};

export type Payload = {
  id: number;
  assignment: Assignment;
};
