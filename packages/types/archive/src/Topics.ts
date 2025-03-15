import * as Snapshot from '@msar/types.snapshot';
import { Annotation } from './Annotation.js';
import * as ContentItem from './ContentItem.js';

export type Item = Snapshot.Topics.Item & { Content: ContentItem.Content };

export type Topic = Snapshot.Topics.Topic & {
  HoverFilename: Annotation;
  OriginalFilename: Annotation;
  HoverImageOriginalFilename: Annotation;
};

export type Data = Topic[];
