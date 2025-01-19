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
  'provider-id': NumericString;
  ToolId: number | NumericString;
  fileSubmissionInd: number;
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
  selected: boolean;
  hasGrades: boolean | null;
  HasEvaluation: boolean | null;
  hasAssessmentResults: null;
  SectionName: string;
  AssignmentId: number | null;
  AssignmentIndexId: number | null;
  SectionId: number;
  OfferingId: number;
  /** m/d/Y */
  AssignmentDate: DateString;
  /** G:i:s */
  AssignmentTime: TimeString;
  /** c */
  dateDue: DateTimeString;
  /** m/d/Y */
  DueDate: DateString;
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
  DropBoxSubmitted: boolean | null;
  PartialInd: boolean | null;
  PartialCount: number | null;
  UsersList: any[]; // TODO Assignment2/List.Payload.SectionLink.UsersList type
};

type LinkItem = {
  ShortDescription: string;
  urlDescription: URLString;
  Url: URLString;
  Delete: boolean;
};

type AssignmentUser = {
  selected: boolean;
  StudentUserId: number;
  SectionId: number;
  Firstname: string | null;
  Lastname: string | null;
  GradYear: NumericString;
  FullName: string;
  LockedInd: boolean;
};

type DownloadItem = {
  DownloadID: number;
  Description: string;
  FileDescription: string[];
  FileName: string;
  FriendlyFileName: string;
  FileTypeID: number;
  UploadedFile: string;
};

type Recurrence = {
  /** c */
  dateDue: DateTimeString;
  timeDue: TimeString;
  /** c */
  dateAssigned: DateTimeString;
  timeAssigned: TimeString;
};

export type Payload = {
  LongDescription: HTMLString;
  SendNotification: boolean;
  ShortDescription: HTMLString;
  AssignmentTypeId: number;
  PublishGrade: boolean;
  IncCumGrade: boolean;
  ExtraCredit: boolean;
  /** max length 9 */
  AbbrDescription: string;
  'max-points': number;
  MaxPoints: number;
  Factor: number | NumericString;
  RubricId: number;
  EvaluationMethod: number;
  AssignmentSkills: any[]; // TODO Assignment2/List.Payload.AssignmentSkills type
  AssignmentCourses: any[]; // TODO Assignment2/List.Payload.AssignmentCourses type
  'inc-rubric': boolean;
  IncRubric: boolean;
  gradebook_ind: boolean;
  IncGradebook: boolean;
  Lti: Lti[];
  'inc-gradebook-lti': boolean;
  OnPaperSubmission: boolean | { value: boolean };
  DropboxInd: boolean | { value: boolean };
  'assignment-instance': boolean | { value: boolean };
  RecurrenceNum: number | null;
  'recurrence-list': Recurrence[];
  /** h:i:s A */
  DropboxTimeLate: TimeString;
  SectionLinks: SectionLink[];
  AssignmentUsers: AssignmentUser[];
  notifBodyControl_ShortDescription: HTMLString;
  notifBodyControl_LongDescription: HTMLString;
  DownloadItems: DownloadItem[];
  LinkItems: LinkItem[];
  Notifications: number[];
};
