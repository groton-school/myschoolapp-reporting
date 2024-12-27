export type Container = {
  ContentId: number;
};

export type Response = {
  ContentItemId?: number;
  FileName?: string;
  Headline?: string;
  Url?: URLString;
  AlbumDescription?: string;
  ShortDescription?: string;
  LongDescription?: HTMLString;
  ContentId: number;
  ContentIndexId?: number;
  TotalFiles?: number;
  FilesProcessed?: number;
  FilesInProcessing?: number;
  AllowDownload?: boolean;
  AllowDownloadMsg?: string;
  ColumnIndex?: number;
  RowIndex: number;
  CellIndex: number;
  GenericSettings: any; // TODO DataDirect/common/ContentItem.Response.GenericSettings type
  PublishedIndicator?: number;
  PublishDate?: DateString;
  ExpireDate?: DateString;
  FilePath?: string;
  FriendlyFileName?: string;
  PresentationTarget?: string;
  PresentationHeight?: number;
  PresentationWidth?: number;
  LinkImage?: string;
  HoverFileName?: string;
  LinkImageId?: number;
  Locked?: boolean;
  Shared?: number;
  SubCategory?: string;
  SortOrder?: number;
  RenditionsComplete?: number;
  CoverFileId?: number;
  OriginalFilename?: string;
  FileEdited?: DateTimeString;
  HasCorruptedFile?: NumericBoolean;
  HoverImageOriginalFilename?: string;
  IsPhotoProcessed?: NumericBoolean;
  PhotoCorrupted?: number;
  PendingInd?: boolean;
};
