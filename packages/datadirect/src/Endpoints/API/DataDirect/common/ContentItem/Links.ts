import {
  DateString,
  DateTimeString,
  HTMLString,
  URLString
} from '@battis/descriptive-types';

export type Link = {
  Url: URLString;
  ShortDescription: string;
  Description: HTMLString;
  UrlDisplay: URLString;
  NewBrowser: boolean;
  LinkImageId: number;
  LinkImage: string;
  LargeHeight: number;
  LargeWidth: number;
  ProcessImageInd: number;
  HoverFileName: string;
  HoverHeight: number;
  HoverWidth: number;
  ProcessHoverImageInd: number;
  SubCategory: string;
  SubCategoryID: number;
  SubCategorySort: number;
  HasMore: boolean;
  LinkID: boolean;
  ItemID: boolean;
  ContextValue: boolean;
  ContextLabelID: boolean;
  SortOrder: boolean;
  DeleteOption: boolean;
  GroupId: number;
  GroupName: string;
  Expired: boolean;
  LibraryResourceId: number;
  PublishDateDisplay: DateString;
  ExpireDateDisplay: DateString;
  LinkImageUrl: URLString;
  HoverImageUrl: URLString;
  GroupLongDescription: HTMLString;
  LinkToSiteId: number;
  LinkToPageTaskId: number;
  LinkItemType: number;
  AssociationId: number;
  InsertDate: DateTimeString;
};

export type Content = Link[];
