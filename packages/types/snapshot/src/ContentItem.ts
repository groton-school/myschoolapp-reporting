import { PathString, URLString } from '@battis/descriptive-types';
import { ArrayElement } from '@battis/typescript-tricks';
import { api } from 'datadirect';
import * as Assignments from './Assignments.js';

export type Assignment<T = PathString> = Omit<
  api.datadirect.ContentItem.Assignment.Assignment,
  'LinkItems' | 'DownloadItems'
> & {
  LinkItems: Assignments.Item<T>['LinkItems'];
  DownloadItems: Assignments.Item<T>['DownloadItems'];
};

export type Media<T = PathString> = Omit<
  api.datadirect.ContentItem.Media.Media,
  'CoverFilenameUrl' | 'FilenameUrl'
> & {
  CoverFilenameUrl: T;
  FilenameUrl: T;
};

export type Audio<T = PathString> = Media<T>;
export type Photo<T = PathString> = Media<T>;
export type Video<T = PathString> = Media<T>;

export type Download<T = PathString> = Omit<
  api.datadirect.ContentItem.Download.Download,
  'DownloadUrl' | 'FilePath'
> & {
  DownloadUrl: T;
  FilePath: T;
};

export type Expectations<T = PathString> = Omit<
  api.datadirect.ContentItem.Expectations.Expectations,
  'Attachment'
> & {
  Attachment: T;
};

export type GradingRubric<T = PathString> = Omit<
  api.datadirect.ContentItem.GradingRubric.GradingRubric,
  'Attachment'
> & {
  Attachment: T;
};

export type Link<T = PathString> = Omit<
  api.datadirect.ContentItem.Links.Link,
  'Url' | 'LinkImageUrl' | 'HoverImageUrl'
> & {
  Url: T;
  LinkImageUrl: T;
  HoverImageUrl: T;
};

export type News<T = PathString> = Omit<
  api.datadirect.ContentItem.News.News,
  'LargeFilenameUrl' | 'ThumbFilenameUrl' | 'ZoomFilenameUrl'
> & {
  LargeFilenameUrl: T;
  ThumbFilenameUrl: T;
  ZoomFilenameUrl: T;
  Url: T;
};

export type RSSReader<T = URLString> = Omit<
  api.datadirect.ContentItem.RSSReader.Content,
  'Url'
> & {
  Url: T | null;
};

export type Syllabus<T = PathString> = Omit<
  api.datadirect.ContentItem.Syllabus.Syllabus,
  'Attachment'
> & {
  Attachment: T | null;
};

export type Text<T = PathString> = Omit<
  api.datadirect.ContentItem.Text.Text,
  'Photos'
> & {
  Photos?: (Omit<
    ArrayElement<NonNullable<api.datadirect.ContentItem.Text.Text['Photos']>>,
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
  | api.datadirect.ContentItem.Any.Content
  | Assignment<T>[]
  | Media<T>[]
  | Audio<T>[]
  | Photo<T>[]
  | Video<T>[]
  | Download<T>[]
  | Expectations<T>[]
  | GradingRubric<T>[]
  | Link<T>[]
  | RSSReader<T>
  | Syllabus<T>[]
  | Text<T>[]
  | { error: string };
