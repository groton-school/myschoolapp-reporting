import {
  DateTimeString,
  NumericBoolean,
  URLString
} from '@battis/descriptive-types';

export type VideoCategory = {
  GroupId: number;
  GroupName: string;
  LongDescriptionInd: boolean;
  PublicGroupInd: boolean;
  IsPublic: NumericBoolean;
  UsedIn: number;
  PreviewUrl: URLString;
  CaptionInd: boolean;
  DescriptionInd: boolean;
  TitleInd: boolean;
  TranscriptInd: boolean;
  MaxPageNum: number;
  TotalRows: number;
  ContextLabelId: number;
  ContextValue: number;
  Id: string;
  Name: string;
  ExpireDate: DateTimeString | null;
  PublishDate: DateTimeString | null;
  Primary: boolean;
  ContextLabel: number;
  albumId: number;
  IsPublicCategory: NumericBoolean;
};

export type Response = VideoCategory[];
