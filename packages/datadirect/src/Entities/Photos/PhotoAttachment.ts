import {
  DateTimeString,
  HTMLString,
  URLString
} from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';
import { ImageOps } from './ImageOps.js';

// used when photos are attached to other data types (e.g. audio albums or assessments)
export type PhotoAttachment = {
  Id: number;
  FilePath: URLString;
  LargeFilenameUrl: URLString;
  LargeFilename: string;
  LargeHeight: number;
  LargeWidth: number;
  ThumbFilenameUrl: URLString;
  ThumbFilename: URLString;
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
  LongDescription: HTMLString; // TODO verify Assessment/AssessmentGetSpa/Response.Photo.LongDescription type (may just be string)
  TagList: JSONValue[];
  FileEdited: boolean;
  IsHoverPhoto: boolean;
  PhotoEapEnabled: boolean;
  ImageOps: ImageOps[];
  OriginalFilenameEditedUrl: URLString;
  LargeFilenameEditedUrl: URLString;
  ZoomFilenameEditedUrl: URLString;
  ThumbFilenameEditedUrl: URLString;
  PhotoTypeId: number;
  PhotoWidth: number;
  PhotoPK: number;
  InsertDate: DateTimeString;
  LastModifyDate: DateTimeString;
  LastModifyUserId: number;
};
