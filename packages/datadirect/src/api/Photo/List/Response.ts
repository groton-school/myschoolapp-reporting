import {
  DateString,
  DateTimeString,
  NumericBoolean,
  PathString
} from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';

type Item = {
  /**
   * Request /api/media/downloadalbum?albumId=:AlbumId&contentType=photo&s=a to
   * download zip file of photos
   */
  AlbumId: number;
  AlbumName: string;
  AlbumDescription: string;
  ContentId: number;
  CoverFilePath: PathString;
  FilePath: PathString;
  CoverFilename: string;
  CoverFileEdited: boolean;
  CoverFileEditedUrl: PathString;
  IsCustomThumb: boolean;
  CoverFilenameUrl: PathString;
  CoverCaption: string;
  CoverTitle: string;
  CoverWidth: number;
  CoverHeight: number;
  NumberOfViews: number;
  Featured: boolean;
  IsThumbExist: boolean;
  FileCount: number;
  VideoFileCount: number;
  VideoEAP: boolean;
  AllowDownload: boolean;
  PublishDate: DateTimeString<'M/D/YYYY H:i A'>;
  PublishDateDisplay: DateString<'M/D/YYYY'>;
  ExpireDateDisplay: DateString<'M/D/YYYY'>;
  GroupList: JSONValue[];
  GroupName: string;
  GroupId: number;
  LargeFilename: string;
  ContentLabel: string;
  OriginalFilename: string;
  FilenameUrl: PathString;
  LongDescriptionInd: NumericBoolean;
  PhotoCaptionInd: NumericBoolean;
  PhotoDescriptionInd: NumericBoolean;
  TranscriptInd: NumericBoolean;
  PhotoTitleInd: NumericBoolean;
  maxPhoto: number;
  ProcessedCount: number;
  InProcessCount: number;
  IsPhotoProcessed: boolean;
  IsBackgroundJobTask: boolean;
  RenditionsComplete: boolean;
  AlbumPhotoCorrupted: boolean;
  HasCorruptedFile: boolean;
  CoverFileId: number;
  MoreAlbums: boolean;
};

export type Response = Item[];
