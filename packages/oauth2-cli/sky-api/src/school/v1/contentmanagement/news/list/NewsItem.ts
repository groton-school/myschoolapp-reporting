import { DateTimeString } from '@battis/descriptive-types';
import { ContentCategory } from '../../ContentCategory.js';
import { MediaItem } from '../../photoalbums/MediaItem.js';

export type NewsItem = {
  id?: number;
  headline?: string;
  author?: string;
  short_description?: string;
  long_description?: string;
  featured?: boolean;
  media_item?: MediaItem[];
  categories?: ContentCategory[];
  send_notification?: boolean;
  show_brief_description?: boolean;
  show_long_description?: boolean;
  created_by?: number;
  created_date?: DateTimeString;
  modified_by?: number;
  modified_date?: DateTimeString;
};
