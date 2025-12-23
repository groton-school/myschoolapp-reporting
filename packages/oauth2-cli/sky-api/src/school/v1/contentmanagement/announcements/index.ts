import * as SkyAPI from '../../../../Client.js';
import { ContentManagementRequest } from '../ContentManagementRequest.js';
import { ContentAnnouncement } from './ContentAnnouncement.js';
import { ContentAnnouncementCategoryCollection } from './ContentAnnouncementCategoryCollection.js';

export * from './ContentAnnouncement.js';
export * from './ContentAnnouncementCategory.js';
export * from './ContentAnnouncementCategoryCollection.js';

export async function categories() {
  return SkyAPI.requestJSON<ContentAnnouncementCategoryCollection>(
    '/school/v1/contentmanagement/announcements/categories'
  );
}

export async function list(request: ContentManagementRequest) {
  return SkyAPI.requestJSON<ContentAnnouncement[]>(
    '/school/v1/contentmanagement/announcements/list',
    'POST',
    JSON.stringify(request)
  );
}
