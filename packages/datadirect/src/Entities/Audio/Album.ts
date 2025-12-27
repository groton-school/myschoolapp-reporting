import {
  DateString,
  DateTimeString,
  NumericBoolean,
  PathString,
  URLString
} from '@battis/descriptive-types';
import { PhotoAttachment } from '../Photos/index.js';
import { Audio } from './Audio.js';
import { Group } from './Group.js';

export type Album = {
  AlbumId: number;
  AlbumName: string;
  AlbumDescription: string;
  ContentId: number;
  CoverFilePath: PathString;
  FilePath: PathString;
  CoverFilename: string;
  CoverFileEdited: boolean;
  IsCustomThumb: boolean;
  CoverFilenameUrl: URLString;
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
  PublishDate: DateTimeString;
  PublishDateDisplay: DateString;
  ExpireDateDisplay: DateString;
  GroupList: Group[];
  GroupName: string;
  GroupId: number;
  LargeFilename: string;
  ContentLabel: string;
  OriginalFilename: string;
  FilenameUrl: URLString;
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

export type Album_EditResponse = Omit<
  Album,
  'PublishDate' | 'GroupName' | 'LargeFileName' | 'OriginalFileName'
> & {
  Album_Id: number;
  Album_Name: string;
  Photos: PhotoAttachment[];
  Files: Audio[];
};
