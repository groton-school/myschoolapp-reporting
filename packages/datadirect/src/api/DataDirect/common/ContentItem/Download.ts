export type Download = {
  DownloadID: number;
  ItemID: number;
  Description: string;
  LongDescription: HTMLString;
  FileName: string;
  HasMore: boolean;
  DownloadUrl: URLString;
  ContextLabelID: number;
  ContextValue: number;
  FileTypeID: number;
  SubCategory: string;
  SubCategoryID: number;
  SubCategorySort: number;
  SortOrder: number;
  DeleteOption: number;
  GroupId: number;
  GroupName: string;
  Expired: boolean;
  PublishDateDisplay: DateString;
  ExpireDateDisplay: DateString;
  GroupLongDescription: string;
  InsertDate: DateTimeString;
};

export type Content = Download[];
