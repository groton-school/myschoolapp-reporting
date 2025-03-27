import { PathString } from '@battis/descriptive-types';
import { api } from 'datadirect';
import * as AlbumContent from './AlbumContent.js';
import * as ContentItem from './ContentItem.js';

export type MediaItem<T = PathString> = api.datadirect.topiccontentget.Item & {
  ObjectType?: api.datadirect.TopicContentTypesGet.Item & {
    Name: 'Photo' | 'Video' | 'Audio' | 'Media';
  };
  AlbumContent?: AlbumContent.Item<T>;
};

export type Item<T = PathString> =
  | (api.datadirect.topiccontentget.Item & {
      ObjectType?: api.datadirect.TopicContentTypesGet.Item;
      Content?: ContentItem.Any<T>;
    })
  | MediaItem<T>;

export type Topic<T = PathString> = Omit<
  api.datadirect.sectiontopicsget.Item,
  'ThumbFilename'
> &
  Omit<api.datadirect.topicget.Item, 'ThumbFilename'> & {
    ThumbFilename: T | null;
    Content?: Item<T>[];
  };

export type Data<T = PathString> = Topic<T>[];
