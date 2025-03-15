import { api } from 'datadirect';

export type Item = api.datadirect.topiccontentget.Item & {
  ObjectType?: api.datadirect.TopicContentTypesGet.Item;
  Content?: api.datadirect.common.ContentItem.Any.Content | { error: string };
};

export type Topic = api.datadirect.sectiontopicsget.Item &
  api.datadirect.topicget.Item & {
    Content?: Item[];
  };

export type Data = Topic[];
