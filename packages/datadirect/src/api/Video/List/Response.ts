import {
  DateString,
  DateTimeString,
  NumericBoolean,
  URLString
} from '@battis/descriptive-types';

export type VideoItem = {
  AlbumId: number;
  AlbumName: string;
  AlbumDescription: string;
  ContentId: number;
  CoverFilePath: URLString;
  FilePath: URLString;
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
  FileCount: boolean;
  VideoFileCount: boolean;
  VideoEAP: boolean;
  AllowDownload: boolean;
  PublishDate: DateTimeString;
  PublishDateDisplay: DateString;
  ExpireDateDisplay: DateString;
  GroupList: any[];
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

export type Response = VideoItem[];
