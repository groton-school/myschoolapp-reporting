import {
  HTMLString,
  NumericBoolean,
  PathString
} from '@battis/descriptive-types';

type ImageOps = {
  FileId: number;
  MetaKey: number;
  MetaValue: string;
  FileTypeId: number;
  FileLocationId: number;
};

export type Item = {
  Id: number;
  FilenameUrl: PathString;
  Filename: string;
  Height: number;
  Width: number;
  ThumbFilenameUrl: PathString;
  ThumbFilename: string;
  ThumbWidth: number;
  ThumbHeight: number;
  ZoomFilename: string;
  Title: string;
  Caption: HTMLString;
  LongDescription: HTMLString;
  AudioTranscript: HTMLString;
  TranscriptFilename: string;
  TranscriptFilenameUrl: PathString;
  Tags: string;
  PhotoTitleInd: NumericBoolean;
  PhotoDescriptionInd: NumericBoolean;
  TranscriptInd: NumericBoolean;
  PhotoCaptionInd: NumericBoolean;
  FilePath: PathString;
  ThumbFilePath: PathString;
  TranscriptFilePath: PathString;
  ZoomFilePath: PathString;
  OriginalFilePath: PathString;
  OriginalFilenameUrl: PathString;
  OriginalFilename: string;
  OriginalWidth: number;
  OriginalHeight: number;
  SortOrder: number;
  CoverFile: boolean;
  AllowDownload: boolean;
  ProcessingStatus: number;
  IsPublic: boolean;
  CorruptedFile: boolean;
  FileEdited: boolean;
  PhotoEapEnabled: boolean;
  AlbumDescription: HTMLString;
  ImageOps: ImageOps[];
  OriginalFilenameEditedUrl: PathString;
  FilenameEditedUrl: PathString;
  ThumbFilenameEditedUrl: PathString;
};

export type Response = Item[];
