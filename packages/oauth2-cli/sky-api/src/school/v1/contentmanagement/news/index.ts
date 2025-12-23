import * as SkyAPI from '../../../../Client.js';
import { ContentManagementRequest } from '../ContentManagementRequest.js';
import { NewsCategoryCollection } from './NewsCategoryCollection.js';
import { NewsItem } from './NewsItem.js';

export * from './NewsCategory.js';
export * from './NewsCategoryCollection.js';
export * from './NewsItem.js';

export async function categories() {
  return await SkyAPI.requestJSON<NewsCategoryCollection>(
    '/school/v1/contentmanagement/news/categories'
  );
}

export async function list(request: ContentManagementRequest) {
  return await SkyAPI.requestJSON<NewsItem[]>(
    '/school/v1/contentmanagement/news/list',
    'POST',
    JSON.stringify(request)
  );
}
