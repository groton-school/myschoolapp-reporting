import { URLString } from '@battis/descriptive-types';
import { ContentCategory } from './ContentCategory.js';

export type PhotoAlbum = {
  id?: number;
  title?: string;
  description?: string;
  allow_downloads?: boolean;
  featured?: boolean;
  categories?: ContentCategory[];
  url?: URLString;
};
