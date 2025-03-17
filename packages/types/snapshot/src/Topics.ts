import { PathString } from '@battis/descriptive-types';
import { api } from 'datadirect';
import * as ContentItem from './ContentItem.js';

export type Item<T = PathString> = api.datadirect.topiccontentget.Item & {
  ObjectType?: api.datadirect.TopicContentTypesGet.Item;
  Content?: ContentItem.Any<T>;
};

export type Topic<T = PathString> = Omit<
  api.datadirect.sectiontopicsget.Item,
  'ThumbFilename'
> &
  api.datadirect.topicget.Item & {
    ThumbFilename: T | null;
    Content?: Item<T>[];
  };

export type Data<T = PathString> = Topic<T>[];
