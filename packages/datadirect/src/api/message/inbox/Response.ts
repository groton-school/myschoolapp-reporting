import {
  DateString,
  DateTimeString,
  HTMLString,
  NumericTimestamp,
  URLString
} from '@battis/descriptive-types';

export type ProfilePhoto = {
  Id: number;
  LargeFilenameUrl: URLString;
  LargeFilename: string;
  LargeHeight: number;
  LargeWidth: number;
  ThumbFilenameUrl: URLString;
  ThumbFilename: string;
  ThumbWidth: number;
  ThumbHeight: number;
  ZoomFilenameUrl: URLString;
  ZoomWidth: number;
  ZoomHeight: number;
  OriginalFilenameUrl: URLString;
  OriginalFilename: string;
  OriginalWidth: number;
  OriginalHeight: number;
  EditedWidth: number;
  EditedHeight: number;
  PhotoEditSettings: string;
  Title: string;
  Caption: string;
  photo_alttext: string;
  hover_alttext: string;
  LongDescription: string;
  TagList: string[];
  FileEdited: boolean;
  IsHoverPhoto: boolean;
  PhotoEapEnabled: boolean;
  ImageOps: any[]; // TODO message/inbox.ProfilePhoto.ImageOps type
  OriginalFilenameEditedUrl: URLString;
  LargeFilenameEditedUrl: URLString;
  ZoomFilenameEditedUrl: URLString;
  ThumbFilenameEditedUrl: URLString;
  PhotoTypeId: number;
  PhotoWidth: number;
  PhotoPK: number;
};

export type FromUser = {
  RowNumber: number;
  RowTotal: number;
  UserId: 7193544;
  FirstName: string;
  LastName: string;
  EmailEffectiveDate?: DateString;
  RetireDate?: DateString;
  StudentDisplay: string;
  UserNameFormatted: string;
  DeceasedDate?: DateString;
  BirthDate?: DateString;
  ResidentFromDate?: DateString;
  VisaIssueDate?: DateString;
  VisaExpireDate?: DateString;
  PassportExpireDate?: DateString;
  AnticipatedCompletionDate?: DateString;
  ClearProfilePhoto: boolean;
  ProfilePhoto: ProfilePhoto;
};

export type Message = {
  MessageId: number;
  ConversationId: number;
  Body: HTMLString;
  FromUser: FromUser;
  SendDate: DateTimeString;
  SendDateTicks: NumericTimestamp;
  ReadInd: boolean;
};

export type Participant = {
  AssociationId: number;
  Pk: number;
  Name: string;
  MembersToInclude: number;
};

export type Item = {
  ConversationId: number;
  ReplyToAll: boolean;
  Subject: string;
  Participants: Participant[];
  Messages?: Message[];
};

export type Response = Item[];
