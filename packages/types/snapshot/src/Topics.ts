import { PathString } from '@battis/descriptive-types';
import { API, Entities } from 'datadirect';
import * as AlbumContent from './AlbumContent.js';
import * as ContentItem from './ContentItem.js';

export type MediaItem<T = PathString> = API.DataDirect.topiccontentget.Item & {
  ObjectType?: API.DataDirect.TopicContentTypesGet.Item & {
    Name: 'Photo' | 'Video' | 'Audio' | 'Media';
  };
  AlbumContent?: AlbumContent.Item<T>;
};

export type Item<T = PathString> =
  | (API.DataDirect.topiccontentget.Item & {
      ObjectType?: API.DataDirect.TopicContentTypesGet.Item;
      Content?: ContentItem.Any<T>;
    })
  | MediaItem<T>;

export type Topic<T = PathString> = Omit<
  Entities.Topics.Topic_Section,
  'ThumbFilename'
> &
  Omit<Entities.Topics.Topic, 'ThumbFilename'> & {
    ThumbFilename: T | null;
    Content?: Item<T>[];
  };

export type Data<T = PathString> = Topic<T>[];
