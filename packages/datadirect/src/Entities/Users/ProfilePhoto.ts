import { URLString } from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';

// from webapp.context merged with inbox profilephoto
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
  ZoomWidth?: number;
  ZoomHeight?: number;
  OriginalFilenameUrl: string;
  OriginalFilename: string;
  OriginalWidth?: number;
  OriginalHeight?: number;
  EditedWidth?: number;
  EditedHeight?: number;
  PhotoEditSettings: string;
  Title: string;
  Caption: string;
  photo_alttext: string;
  hover_alttext: string;
  LongDescription: string;
  TagList: string[];
  FileEdited?: boolean;
  IsHoverPhoto?: boolean;
  PhotoEapEnabled?: boolean;
  ImageOps: JSONValue[]; // TODO webapp/context/Response.ProfilePhoto.ImageOps type
  OriginalFilenameEditedUrl: URLString;
  LargeFilenameEditedUrl: URLString;
  ZoomFilenameEditedUrl: URLString;
  ThumbFilenameEditedUrl: URLString;
};

// from webapp.context
export type ProfilePhotoFile = {
  Attachment: string;
  DownloadHref: URLString;
  OpenHref: URLString;
};
