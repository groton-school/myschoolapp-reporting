import { URLString } from '@battis/descriptive-types';

export type MediaItem = {
  id?: number;
  type?: string;
  title?: string;
  caption?: string;
  tags?: string;
  description?: string;
  is_cover?: boolean;
  url?: URLString;
  thumbnail_url?: URLString;
};
