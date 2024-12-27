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
};

export type Content = Text[];
