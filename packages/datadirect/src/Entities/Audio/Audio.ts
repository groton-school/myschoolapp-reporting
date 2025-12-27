import {
  DateTimeString,
  NumericBoolean,
  PathString,
  URLString
} from '@battis/descriptive-types';

export type Audio = {
  Id: number;
  FilenameUrl: URLString;
  Filename: string;
  Height: number;
  Width: number;
  ThumbFilenameUrl: URLString;
  ThumbFilename: string;
  ThumbWidth: number;
  ThumbHeight: number;
  ZoomFilename: string;
  Title: string;
  Caption: string;
  LongDescription: string;
  AudioTranscript: string;
  TranscriptFilename: string;
  TranscriptFilenameUrl: URLString;
  TranscriptOriginalFilename: string;
  TagList: string[];
  Tags: string;
  PhotoTitleInd: NumericBoolean;
  PhotoDescriptionInd: NumericBoolean;
  TranscriptInd: NumericBoolean;
  PhotoCaptionInd: NumericBoolean;
  FilePath: PathString;
  ThumbFilePath: PathString;
  ZoomFilePath: PathString;
  OriginalFilePath: PathString;
  OriginalFilenameUrl: URLString;
  OriginalFilename: string;
  OriginalWidth: number;
  OriginalHeight: number;
  SortOrder: number;
  CoverFile: boolean;
  AllowDownload: boolean;
  ProcessingStatus: number;
  IsPublic: boolean;
  CorruptedFile: boolean;
  FileEdited: false;
  PhotoEapEnabled: boolean;
  OriginalFilenameEditedUrl: URLString;
  FilenameEditedUrl: URLString;
  ThumbFilenameEditedUrl: URLString;
  InsertDate: DateTimeString;
  LastModifyDate: DateTimeString;
  LastModifyUserId: number;
};
