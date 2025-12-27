import { PathString } from '@battis/descriptive-types';
import { ArrayElement } from '@battis/typescript-tricks';
import { API } from 'datadirect';
import * as Assignments from './Assignments.js';

export type Assignment<T = PathString> = Omit<
  API.DataDirect.ContentItem.Assignment.Assignment,
  'LinkItems' | 'DownloadItems'
> & {
  LinkItems: Assignments.Item<T>['LinkItems'];
  DownloadItems: Assignments.Item<T>['DownloadItems'];
};

export type Media<T = PathString> = Omit<
  API.DataDirect.ContentItem.Media.Media,
  'CoverFilenameUrl' | 'FilenameUrl'
> & {
  CoverFilenameUrl: T;
  FilenameUrl: T;
};

export type Audio<T = PathString> = Media<T>;
export type Photo<T = PathString> = Media<T>;
export type Video<T = PathString> = Media<T>;

export type Download<T = PathString> = Omit<
  API.DataDirect.ContentItem.Download.Download,
  'DownloadUrl' | 'FilePath'
> & {
  DownloadUrl: T;
  FilePath: T;
};

export type Expectations<T = PathString> = Omit<
  API.DataDirect.ContentItem.Expectations.Expectations,
  'Attachment'
> & {
  Attachment: T;
};

export type GradingRubric<T = PathString> = Omit<
  API.DataDirect.ContentItem.GradingRubric.GradingRubric,
  'Attachment'
> & {
  Attachment: T;
};

export type Link<T = PathString> = Omit<
  API.DataDirect.ContentItem.Links.Link,
  'Url' | 'LinkImageUrl' | 'HoverImageUrl'
> & {
  Url: T;
  LinkImageUrl: T;
  HoverImageUrl: T;
};

export type News<T = PathString> = Omit<
  API.DataDirect.ContentItem.News.News,
  'LargeFilenameUrl' | 'ThumbFilenameUrl' | 'ZoomFilenameUrl'
> & {
  LargeFilenameUrl: T;
  ThumbFilenameUrl: T;
  ZoomFilenameUrl: T;
  Url: T;
};

export type RSSReader = API.DataDirect.ContentItem.RSSReader.Content;

export type Syllabus<T = PathString> = Omit<
  API.DataDirect.ContentItem.Syllabus.Syllabus,
  'Attachment'
> & {
  Attachment: T | null;
};

export type Text<T = PathString> = Omit<
  API.DataDirect.ContentItem.Text.Text,
  'Photos'
> & {
  Photos?: (Omit<
    ArrayElement<NonNullable<API.DataDirect.ContentItem.Text.Text['Photos']>>,
    | 'LargeFilenameUrl'
    | 'ThumbFilenameUrl'
    | 'ZoomFilenameUrl'
    | 'OriginalFilenameUrl'
    | 'OriginalFilenameEditedUrl'
    | 'LargeFilenameEditedUrl'
    | 'ZoomFilenameEditedUrl'
    | 'ThumbFilenameEditedUrl'
  > & {
    LargeFilenameUrl: T | null;
    ThumbFilenameUrl: T | null;
    ZoomFilenameUrl: T | null;
    OriginalFilenameUrl: T | null;
    OriginalFilenameEditedUrl: T | null;
    LargeFilenameEditedUrl: T | null;
    ZoomFilenameEditedUrl: T | null;
    ThumbFilenameEditedUrl: T | null;
  })[];
};

export type Any<T = PathString> =
  | API.DataDirect.ContentItem.Any.Content
  | Assignment<T>[]
  | Media<T>[]
  | Audio<T>[]
  | Photo<T>[]
  | Video<T>[]
  | Download<T>[]
  | Expectations<T>[]
  | GradingRubric<T>[]
  | Link<T>[]
  | RSSReader
  | Syllabus<T>[]
  | Text<T>[]
  | { error: string };
