import {
  DateString,
  DateTimeString,
  HTMLString,
  NumericBoolean,
  TimeString,
  URLString
} from '@battis/descriptive-types';

type Duration = {
  DurationId: number;
  SortOrder: number;
  LevelNum: number;
  SchoolYearLabel: string;
  SchoolYearId: number;
  Name: string;
  Id: number;
  OfferingType: number;
  BeginDate: DateTimeString;
  EndDate: DateTimeString;
  DaysBeyondTerm: number;
  InUse: boolean;
  Current: boolean;
  dd_id: number;
  SelectedInd: number;
  SchoolLevelIds: any[]; // TODO Assignment2/SecureGet.Duration.SchoolLevelIds type (probably number[])
};

type Section = {
  ParentSectionId: number;
  OfferingId: number;
  LeadSectionId: number;
  Name: string;
  Duration: Duration;
  RoomId: number;
  BlockId: number;
};

type SectionLink = {
  AssignmentId: number;
  AssignmentIndexId: number;
  SchoolId: number;
  SectionId: number;
  DateInsert: DateString;
  AssignmentDate: DateString;
  AssignmentTime: TimeString;
  DueDate: DateString;
  DueTime: TimeString;
  PublishInd: boolean;
  PublishOnAssignedInd: boolean;
  MarkingPeriodId: number;
  Section: Section;
  HasGrades: boolean;
  HasGradeDetails: boolean;
  HasGradeValues: boolean;
  HasEvaluation: boolean;
  HasEvaluationDetails: boolean;
  HasEvaluationValues: boolean;
  DropBoxSubmitted: boolean;
  HasAssessmentResults: boolean;
  OfferingId: number;
  PartialInd: boolean;
  PartialCount: number;
  LevelNum: number;
};

type DownloadItem = {
  DownloadID: number;
  ItemID: number;
  ShortDescription: string;
  LongDescription: string;
  FileName: string;
  FriendlyFileName: string;
  HasMore: boolean;
  DownloadUrl: URLString;
  ContextLabelID: number;
  ContextValue: number;
  FileTypeID: number;
  SubCategoryID: number;
  SubCategorySort: number;
  SortOrder: number;
  DeleteOption: number;
  GroupId: number;
  Expired: boolean;
  PublishDateDisplay: DateTimeString;
  ExpireDateDisplay: DateTimeString;
};

type Lti = {
  GalleryId: number;
  ProviderId: number;
  ProviderName: string;
  ToolId: number;
  ToolIndexId: number;
  ToolTitle: string;
  ToolDescription: string;
  PresentationTarget: number;
  PresentationHeight: number;
  AllowLaunchInd: boolean;
  AllowLaunchMsg: string;
  LtiConfigInd: boolean;
  LaunchTypeId: number;
  ParameterInd: number;
  LaunchUrl: URLString;
  ConsumerKey: string;
  SharedSecret: string;
  CredentialsTypeId: number;
  OutcomesInd: boolean;
  Parameters: any[]; // TODO Assignment2/SecureGet.Lti.Parameters type
  LtiOauth2Ind: boolean;
  LineItemTag: string;
  LineItemResourceId: string;
  ToolContextLabelId: number;
  ToolContextValue: number;
};

type LinkItem = {
  Url: URLString;
  ShortDescription: string;
  UrlDisplay: URLString;
  NewBrowser: boolean;
  LinkImageId: number;
  LargeHeight: number;
  LargeWidth: number;
  ProcessImageInd: number;
  HoverHeight: number;
  HoverWidth: number;
  ProcessHoverImageInd: number;
  SubCategoryID: number;
  SubCategorySort: number;
  HasMore: boolean;
  LinkID: number;
  ItemID: number;
  ContextValue: number;
  ContextLabelID: number;
  SortOrder: number;
  DeleteOption: number;
  GroupId: number;
  Expired: boolean;
  LibraryResourceId: number;
  PublishDateDisplay: DateTimeString;
  ExpireDateDisplay: DateTimeString;
  LinkImageUrl: URLString;
  HoverImageUrl: URLString;
  LinkToSiteId: number;
  LinkToPageTaskId: number;
  LinkItemType: number;
  AssociationId: number;
};

export type Response = {
  AssignmentId: number;
  AssignmentTypeId: number;
  AssignmentType: string;
  ShortDescription: string;
  LongDescription: HTMLString;
  IncGradeBook: boolean;
  AbbrDescription: string;
  MaxPoints: number;
  Factor: number;
  ExtraCredit: boolean;
  IncCumGrade: boolean;
  PublishGrade: boolean;
  OnPaperSubmission: boolean;
  DropboxInd: boolean;
  DropboxNumFiles: number;
  DropboxResub: boolean;
  LocalNow: any | null; // Assignent2/SecureGet.Response.LocalNow type
  AssignmentStatus: number;
  HasGrade: NumericBoolean;
  MissingInd: NumericBoolean;
  ExemptInd: NumericBoolean;
  IncompleteInd: NumericBoolean;
  LateInd: NumericBoolean;
  DropboxTimeLate: TimeString;
  SchoolId: number;
  SectionLinks: SectionLink[];
  DownloadItems: DownloadItem[];
  LinkItems: LinkItem[];
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
  Embed: string;
  SaveForLater: boolean;
  Lti: Lti[];
  RubricId: number;
  ParentRubricId: number;
  AssignmentRubricLocked: boolean;
  RubricName: string;
  EvaluationMethod: number;
  HasCompetencyGrades: number;
  FormativeInd: boolean;
  DefaultDateAssigned: DateTimeString | null;
  DefaultDateDue: DateTimeString | null;
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
