import { URLString } from '@battis/descriptive-types';
import { MediaItem } from './MediaItem.js';

export type MediaItemCollection = {
  count?: number;
  next_link?: URLString;
  value?: MediaItem[];
};
