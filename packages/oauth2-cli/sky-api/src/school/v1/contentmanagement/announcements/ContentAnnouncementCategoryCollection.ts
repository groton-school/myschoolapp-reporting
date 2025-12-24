import { URLString } from '@battis/descriptive-types';
import { ContentAnnouncementCategory } from './ContentAnnouncementCategory.js';

export type ContentAnnouncementCategoryCollection = {
  count?: number;
  next_link?: URLString;
  value?: ContentAnnouncementCategory[];
};
