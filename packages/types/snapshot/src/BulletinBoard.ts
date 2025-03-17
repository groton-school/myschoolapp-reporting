import { PathString } from '@battis/descriptive-types';
import { api } from 'datadirect';
import * as ContentItem from './ContentItem.js';

export type Item<T = PathString> =
  api.datadirect.BulletinBoardContentGet.Item & {
    Content?: ContentItem.Any<T>;
    ContentType?: api.datadirect.common.ContentType.Any;
  };
export type Data<T = PathString> = Item<T>[];
