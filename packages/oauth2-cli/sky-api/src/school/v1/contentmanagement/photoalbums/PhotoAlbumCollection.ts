import { URLString } from '@battis/descriptive-types';
import { PhotoAlbum } from './PhotoAlbum.js';

export type PhotoAlbumCollection = {
  count?: number;
  next_link?: URLString;
  value?: PhotoAlbum[];
};
