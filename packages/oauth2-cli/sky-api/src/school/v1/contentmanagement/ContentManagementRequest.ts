import { DateTimeString } from '@battis/descriptive-types';
import { CategoryRequest } from './CategoryRequest.js';

export type ContentManagementRequest = {
  categories: CategoryRequest[];
  as_of_date?: DateTimeString<'ISO'>;
  last_modified?: DateTimeString<'ISO'>;
  show_secured?: boolean;
};
