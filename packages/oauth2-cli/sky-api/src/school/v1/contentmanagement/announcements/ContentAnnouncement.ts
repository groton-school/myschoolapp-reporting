import { DateTimeString } from '@battis/descriptive-types';
import { ContentCategory } from '../ContentCategory.js';

export type ContentAnnouncement = {
  id?: number;
  headline?: string;
  author?: string;
  description?: string;
  send_notification?: boolean;
  created_date?: DateTimeString;
  modified_date?: DateTimeString;
  created_by?: number;
  modified_by?: number;
  categories?: ContentCategory[];
};
