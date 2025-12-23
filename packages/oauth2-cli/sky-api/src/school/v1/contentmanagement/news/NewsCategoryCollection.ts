import { URLString } from '@battis/descriptive-types';
import { NewsCategory } from './NewsCategory.js';

export type NewsCategoryCollection = {
  count?: number;
  next_link?: URLString;
  value?: NewsCategory[];
};
