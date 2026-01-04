import { Paginated } from '../../../../Paginated.js';
import * as SkyAPI from '../../../../SkyAPI.js';
import { ContentManagementRequest } from '../ContentManagementRequest.js';
import { NewsCategory } from './NewsCategory.js';
import { NewsCategoryCollection } from './NewsCategoryCollection.js';
import { NewsItem } from './NewsItem.js';

export * from './NewsCategory.js';
export * from './NewsCategoryCollection.js';
export * from './NewsItem.js';

export async function categories() {
  return new Paginated<NewsCategory>(
    await SkyAPI.Client.requestJSON<NewsCategoryCollection>(
      'https://api.sky.blackbaud.com/school/v1/contentmanagement/news/categories'
    )
  );
}

export async function list(request: ContentManagementRequest) {
  return await SkyAPI.Client.requestJSON<NewsItem[]>(
    'https://api.sky.blackbaud.com/school/v1/contentmanagement/news/list',
    'POST',
    JSON.stringify(request),
    new Headers({ 'Content-Type': 'application/json' })
  );
}
