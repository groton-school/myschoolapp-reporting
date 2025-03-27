import { PathString } from '@battis/descriptive-types';
import { api } from 'datadirect';
import * as AlbumContent from './AlbumContent.js';
import * as ContentItem from './ContentItem.js';

export type Item<T = PathString> = api.datadirect.BulletinBoardContentGet.Item &
  (
    | {
        Content?: ContentItem.Any<T>;
        ContentType?: api.datadirect.common.ContentType.Any;
      }
    | {
        Content?: ContentItem.Media<T>[];
        ContentType?: api.datadirect.common.ContentType.Media;
        AlbumContent?: AlbumContent.Data<T>;
      }
  );
export type Data<T = PathString> = Item<T>[];
