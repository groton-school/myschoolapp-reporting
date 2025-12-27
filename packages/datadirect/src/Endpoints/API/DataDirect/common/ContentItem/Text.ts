import {
  DateTimeString,
  HTMLString,
  PathString
} from '@battis/descriptive-types';

type ImageOp = {
  FileId: number;
  MetaKey: number;
  /** e.g. `"440px"` */
  MetaValue: string;
  FileTypeId: number;
  FileLocationId: number;
};

type Photo = {
  Id: number;
  FilePath: PathString;
  ThumbFilePath: PathString;
  ZoomFilePath: PathString;
  OriginalFilePath: PathString;
  LargeFilenameUrl: PathString;
  LargeFilename: string;
  LargeHeight: number;
  LargeWidth: number;
  ThumbFilenameUrl: PathString;
  ThumbFilename: string;
  ThumbWidth: number;
  ThumbHeight: number;
  ZoomFilenameUrl: string;
  ZoomWidth: number;
  ZoomHeight: number;
  OriginalFilenameUrl: PathString;
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
  LongDescription: HTMLString;
  TagList: [];
  FileEdited: boolean;
  IsHoverPhoto: boolean;
  PhotoEapEnabled: boolean;
  ImageOps: ImageOp[];
  OriginalFilenameEditedUrl: PathString;
  LargeFilenameEditedUrl: PathString;
  ZoomFilenameEditedUrl: PathString;
  ThumbFilenameEditedUrl: PathString;
  PhotoTypeId: number;
  PhotoWidth: number;
  PhotoPK: number;
};

export type Text = {
  Description: string;
  LongText: HTMLString;
  CreateDate: DateTimeString;
  AllowEdit: boolean;
  AlbumID: number;
  CategoryID: number;
  FileID: number;
  SortOrder: number;
  EditableTextId: number;
  CaptionInd: boolean;
  CreateName: string;
  ModifyName: string;
  IsBackgroundJobTask: boolean;
  IsPhotoProcessed: boolean;
  PhotoCorrupted: boolean;
  FileName?: PathString;
  Photos?: Photo[];
};

export type Content = Text[];
