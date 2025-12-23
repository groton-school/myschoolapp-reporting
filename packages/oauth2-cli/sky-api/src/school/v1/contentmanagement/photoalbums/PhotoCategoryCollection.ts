import { PhotoCategory } from './PhotoCategory.js';

export type PhotoCategoryCollection = {
  count?: number;
  next_link?: string;
  value: PhotoCategory[];
};
