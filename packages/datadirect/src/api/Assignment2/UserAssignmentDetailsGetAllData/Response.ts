import {
  DateTimeString,
  HTMLString,
  URLString
} from '@battis/descriptive-types';

export type LinkItem = {
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

export type DownloadItem = {
  DownloadID: number;
  ItemID: number;
  ShortDescription: string;
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

export type Response = {
  SectionId: number;
  AssignmentId: number;
  ShortDescription: HTMLString;
  AssignmentDate: DateTimeString;
  DueDate: DateTimeString;
  LongDescription: HTMLString;
  AssignmentIndexId: number;
  IncGradeBook: boolean;
  PublishGrade: boolean;
  PublishGradebookGrade: boolean;
  PublishGradebookComment: boolean;
  AssessmentInd: boolean;
  DiscussionInd: boolean;
  FormativeInd: boolean;
  ExtraCredit: boolean;
  IncCumGrade: boolean;
  OnPaperSubmission: boolean;
  DropboxInd: boolean;
  DropboxNumFiles: number;
  PublishInd: boolean;
  PublishOnAssignedInd: boolean;
  ScaleId: number;
  EvaluationMethod: number;
  LevelNum: number;
  RubricInd: boolean;
  ParentRubricId: number;
  RubricId: number;
  DownloadItems: DownloadItem[];
  LinkItems: LinkItem[];
  PartialInd: boolean;
  LtiProviderId: number;
  LtiProviderName: string;
  Skills: any[]; // TODO Assignment2/UserAssignmentDetailsGetAllData.Response.Skills type
  Discussion: {
    TeacherFirstname: string;
    TeacherLastname: string;
    PhotoFilename: string;
  };
  NewAssessmentInd: boolean;
  DropBoxResub: boolean;
  CanResubmit: boolean;
  PastDue: boolean;
  CourseEnded: boolean;
  GroupEndDate: null;
};
