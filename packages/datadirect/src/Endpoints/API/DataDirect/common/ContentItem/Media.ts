import {
  DateString,
  DateTimeString,
  HTMLString,
  NumericString,
  URLString
} from '@battis/descriptive-types';

export type Media = {
  AlbumId: number;
  AlbumName: string;
  AlbumDescription: HTMLString;
  ContentId: number;
  CoverFilePath: URLString;
  FilePath: URLString;
  CoverFilename: string;
  CoverFileEdited: boolean;
  CoverFileEditedUrl?: URLString;
  IsCustomThumb: boolean;
  CoverFilenameUrl: URLString;
  CoverCaption: string;
  CoverTitle: NumericString;
  CoverWidth: number;
  CoverHeight: number;
  NumberOfViews: number;
  Featured: boolean;
  IsThumbExist: boolean;
  FileCount: 1;
  VideoFileCount: number;
  VideoEAP: boolean;
  AllowDownload: boolean;
  PublishDate: DateTimeString;
  PublishDateDisplay: DateString;
  ExpireDateDisplay: DateString;
  GroupList: any[]; // TODO DataDirect/common/ContentItem/Audio.GroupList type
  GroupName: string;
  GroupId: number;
  LargeFilename: string;
  ContentLabel: string;
  OriginalFilename: string;
  FilenameUrl: URLString;
  LongDescriptionInd: number;
  PhotoCaptionInd: number;
  PhotoDescriptionInd: number;
  TranscriptInd: number;
  PhotoTitleInd: number;
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

export type Content = Media[];
