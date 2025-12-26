import { SkyAPI } from '@oauth2-cli/sky-api';
import * as PhotoAlbums from '../PhotoAlbums/index.js';

export type AnnotatedNewsItem = Omit<
  SkyAPI.school.v1.contentmanagement.news.NewsItem,
  'media_item'
> & { media_item?: PhotoAlbums.AnnotatedMediaItem[] };

export type AnnotatedNewsCategory =
  SkyAPI.school.v1.contentmanagement.news.NewsCategory & {
    news_items?: AnnotatedNewsItem[];
  };
