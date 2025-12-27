import { PathString } from '@battis/descriptive-types';
import { Endpoints } from 'datadirect';
import * as AlbumContent from './AlbumContent.js';
import * as ContentItem from './ContentItem.js';

export type Item<T = PathString> =
  Endpoints.API.DataDirect.BulletinBoardContentGet.Item &
    (
      | {
          Content?: ContentItem.Any<T>;
          ContentType?: Endpoints.API.DataDirect.common.ContentType.Any;
        }
      | {
          Content?: ContentItem.Media<T>[];
          ContentType?: Endpoints.API.DataDirect.common.ContentType.Media;
          AlbumContent?: AlbumContent.Data<T>;
        }
    );
export type Data<T = PathString> = Item<T>[];
