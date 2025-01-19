import {
  DateTimeString,
  EmailString,
  HTMLString,
  NumericString,
  URLString,
  UUIDString
} from '@battis/descriptive-types';

type ProfilePhoto = {
  Id: number;
  LargeFilenameUrl: URLString;
  LargeFilename: string;
  LargeHeight: number;
  LargeWidth: number;
  ThumbFilenameUrl: URLString;
  ThumbFilename: string;
  ThumbWidth: number;
  ThumbHeight: number;
  ZoomFilenameUrl: string;
  OriginalFilenameUrl: string;
  OriginalFilename: string;
  PhotoEditSettings: string;
  Title: string;
  Caption: string;
  photo_alttext: string;
  hover_alttext: string;
  LongDescription: string;
  TagList: string[];
  ImageOps: any[]; // TODO webapp/context/Response.ProfilePhoto.ImageOps type
  OriginalFilenameEditedUrl: string;
  LargeFilenameEditedUrl: URLString;
  ZoomFilenameEditedUrl: string;
  ThumbFilenameEditedUrl: URLString;
};

type ProfilePhotoFile = {
  Attachment: string;
  DownloadHref: URLString;
  OpenHref: URLString;
};

type UserInfo = {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: EmailString;
  UserName: EmailString;
  LegacyUserName: string;
  HostId: string;
  Greeting: string;
  MaidenName: string;
  NickName: string;
  PreferredLastName: string;
  Prefix: string;
  Suffix: string;
  MiddleName: string;
  EmailIsBad: boolean;
  OtherLastName: string;
  CcEmail: EmailString;
  CcEmailIsBad: boolean;
  Affiliation: string;
  StudentDisplay: string;
  UserNameFormatted: string;
  InsertBy: string;
  StudentInfo: {
    GradYear: NumericString;
  };
  Citizenship: string;
  PersonalWebsite: string;
  BoardingOrDay: string;
  IsDeceased: boolean;
  LivingStatus: string;
  ScreenName: string;
  IMService: string;
  IsLost: boolean;
  GenderDesc: string;
  Gender: string;
  Pronouns: number;
  BirthDate: DateTimeString;
  PersonalBio: string;
  MiscBio: HTMLString;
  ResidentCounty: string;
  BirthPlace: string;
  SpokenLanguages: any[]; // webapp/context.Response.SpokenLanguages type
  RaceSelections: any[]; // webapp/context.Response.RaceSelections type
  VisaNumber: string;
  PassportNumber: string;
  StudentId: string;
  LockerNbr: string;
  LockerCombo: string;
  MailboxNbr: string;
  MailboxCombo: string;
  StudentResponsibleSignerInd: boolean;
  StateId: string;
  OptOutOfSellingInformation: 0;
  OptOutOfTargetedAdvertising: 0;
  PublishUserPage: boolean;
  GradebookDefaultInd: boolean;
  DefaultPersonaId: 3;
  CustomField1: string;
  CustomField2: string;
  CustomField3: string;
  CustomField4: string;
  CustomField5: string;
  CustomField6: string;
  CustomField7: string;
  CustomField8: string;
  CustomField9: string;
  CustomField10: string;
  ProfilePhoto: ProfilePhoto;
  ProfilePhotoFile: ProfilePhotoFile;
  Bbid: UUIDString;
  InsertDate: DateTimeString;
  LastModifyDate: DateTimeString;
  LastModifyUserId: number;
};

type Task = {
  TaskId: number;
  ApplicationId: number;
  TaskTypeId: number;
  Description: string;
  HashString: string;
  TaskRef: string;
  Personas: string;
  Roles: NumericString;
  RoleTypes: NumericString;
};

type Persona = {
  Id: number;
  Description: string;
  LongDescription: string;
  Type: number;
  Sort: number;
  Active: boolean;
  StartingPageId: number;
  StartingPageName: string;
  DefaultPersona: boolean;
  UrlFriendlyDescription: string;
  Url: URLString;
  Selected: boolean;
};

type Group = {
  LeadSectionId: number;
  SectionId: number;
  CurrentSectionId: number;
  Association: number;
  OfferingId: number;
  GroupName: string;
  SchoolYear: string;
  SectionBlock: string;
  OwnerName: string;
  Category: string;
  PublishGroupToUser: boolean;
  CurrentEnrollment: boolean;
};

type Child = {
  Id: number;
  FirstName: string;
  LastName: string;
  NickName: string;
  GradYear: NumericString;
  PublishUserPage: boolean;
  ParentalAccessInd: boolean;
  Role: string;
  ParentRoleId: NumericString;
  ThumbFilename: string;
  LargeFilename: string;
  PhotoEditSettings: string;
};

type Directory = {
  DirectoryID: number;
  SortOrder: number;
  DirectoryName: string;
};

type Calendar = {
  view_id: number;
  title: string;
};

export type Response = {
  Expire: DateTimeString;
  Generated: string;
  CacheSource: string;
  UserInfo: UserInfo;
  MasterUserInfo: UserInfo;
  Tasks: Task[];
  Personas: Persona[];
  Groups: Group[];
  Children: Child[];
  IsImpersonating: boolean;
  ViewonlyMode: boolean;
  ShowGuidedTours: boolean;
  GuidedTourSetting: boolean;
  Directories: Directory[];
  Calendars: Calendar[];
  PodiumCalendars: Calendar[];
  AlumHasRegistration: boolean;
  UserParam: {
    HasHelpAccess: boolean;
    ListPersonas: string;
  };
  InboxSettings: {
    IndividualMessageEnabled: boolean;
    BulkMessageEnabled: boolean;
    BulkEmailEnabled: boolean;
    GoogleLabel: string;
    GoogleUrl: URLString;
    GoogleAccessGranted: boolean;
  };
  IsBBIDUser: boolean;
};
