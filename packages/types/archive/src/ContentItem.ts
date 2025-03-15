import { ArrayElement } from '@battis/typescript-tricks';
import { api } from 'datadirect';
import { Annotation } from './Annotation.js';
import * as Assignments from './Assignments.js';

export type Assignment = api.datadirect.ContentItem.Assignment.Assignment & {
  LinkItems: Assignments.Item['LinkItems'];
  DownloadItems: Assignments.Item['DownloadItems'];
};

export type Media = api.datadirect.ContentItem.Media.Media & {
  CoverFilenameUrl: Annotation;
  FilenameUrl: Annotation;
};

export type Audio = Media;
export type Photo = Media;
export type Video = Media;

export type Download = api.datadirect.ContentItem.Download.Download & {
  DownloadUrl: Annotation;
};

export type Expectations =
  api.datadirect.ContentItem.Expectations.Expectations & {
    Attachment: Annotation;
  };

export type GradingRubric =
  api.datadirect.ContentItem.GradingRubric.GradingRubric & {
    Attachment: Annotation;
  };

export type Link = api.datadirect.ContentItem.Links.Link & {
  Url: Annotation;
  LinkImageUrl: Annotation;
  HoverImageUrl: Annotation;
};

export type News = api.datadirect.ContentItem.News.News & {
  LargeFilenameUrl: Annotation;
  ThumbFilenameUrl: Annotation;
  ZoomFilenameUrl: Annotation;
  Url: Annotation;
};

export type RSSReader = api.datadirect.ContentItem.RSSReader.Content & {
  Url: Annotation;
};

export type Syllabus = api.datadirect.ContentItem.Syllabus.Syllabus & {
  Attachment: Annotation;
};

export type Text = api.datadirect.ContentItem.Text.Text & {
  Photos?: (ArrayElement<
    NonNullable<api.datadirect.ContentItem.Text.Text['Photos']>
  > & {
    LargeFilenameUrl: Annotation;
    ThumbFilenameUrl: Annotation;
    ZoomFilenameUrl: Annotation;
    OriginalFilenameUrl: Annotation;
    OriginalFilenameEditedUrl: Annotation;
    LargeFilenameEditedUrl: Annotation;
    ZoomFilenameEditedUrl: Annotation;
    ThumbFilenameEditedUrl: Annotation;
  })[];
};

export type Content =
  | api.datadirect.ContentItem.Any.Content
  | Assignment[]
  | Media[]
  | Audio[]
  | Photo[]
  | Video[]
  | Download[]
  | Expectations[]
  | GradingRubric[]
  | Link[]
  | RSSReader
  | Syllabus[]
  | Text[];
