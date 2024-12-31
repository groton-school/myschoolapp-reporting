import {
  DateString,
  DateTimeString,
  URLString
} from '@battis/descriptive-types';

export type Group = {
  GroupId: number;
  AssociationId: number;
  MpSelected: boolean;
  UsedIn: number;
  PublicGroupInd: boolean;
  IsPublic: number;
  MaxPageNum: number;
  TotalRows: number;
  RssInd: boolean;
  BriefInd: boolean;
  DescriptionInd: boolean;
  CaptionInd: boolean;
  PhotoLongInd: boolean;
  ZoomInd: boolean;
  ThumbInd: boolean;
  FbConnectInd: number;
  DispFbProfPhoto: boolean;
  FacebookAppId: number;
  SelectedInd: boolean;
  ContextLabelId: number;
  ContextValue: number;
  Id: string;
  ExpireDate: DateTimeString;
  PublishDate: DateTimeString;
  Primary: boolean;
  ContextLabel: number;
};

export type News = {
  Id: number;
  Name: string;
  PhotoList: any[]; // TODO DataDirect/common/ContentItem/News.PhotoList type
  LargeFilenameUrl: URLString;
  LargeHeight: number;
  LargeWidth: number;
  ThumbFilenameUrl: URLString;
  ThumbHeight: number;
  ThumbWidth: number;
  ZoomFilenameUrl: URLString;
  ZoomHeight: number;
  ZoomWidth: number;
  PublishDate: DateTimeString;
  BriefDescription: string;
  Description: 'yes' | 'no';
  Url: URLString;
  CommentCount: number;
  CommentType: number;
  LastItem: boolean;
  GroupList: Group[];
  GroupCommentType: number;
  IsPublicCategory: number;
  GroupId: number;
  PublishDateDisplay: DateString;
  PublishDateLong: DateString;
  Author: string;
  ExpireDateDisplay: DateString;
  Expired: boolean;
  ScheduleId: number;
  AthleticScheduleId: number;
  ContextValue: number;
  BriefDescriptionInd: number;
  LongDescriptionInd: number;
  PrimaryGroup: boolean;
  PhotoCaptionInd: number;
  PhotoDescriptionInd: number;
  ImageMax: number;
  ShowReadMore: boolean;
  Featured: boolean;
  photo_id: number;
  OriginalWidth: number;
  OriginalHeight: number;
  SocialMediaList: any[]; // TODO DataDirect/common/ContentItem/News.SocialMediaList type
};

export type Content = News[];
