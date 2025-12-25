import * as SkyAPI from '../../../../Client.js';
import { Paginated } from '../../../../Paginated.js';
import { ContentManagementRequest } from '../ContentManagementRequest.js';
import { MediaItem } from './MediaItem.js';
import { MediaItemCollection } from './MediaItemCollection.js';
import { PhotoAlbum } from './PhotoAlbum.js';
import { PhotoCategory } from './PhotoCategory.js';
import { PhotoCategoryCollection } from './PhotoCategoryCollection.js';

export * from './ImageDimension.js';
export * from './ImageSettings.js';
export * from './MediaItem.js';
export * from './MediaItemCollection.js';
export * from './PhotoAlbum.js';
export * from './PhotoCategory.js';
export * from './PhotoCategoryCollection.js';

export async function categories() {
  return new Paginated<PhotoCategory>(
    await SkyAPI.requestJSON<PhotoCategoryCollection>(
      'https://api.sky.blackbaud.com/school/v1/contentmanagement/photoalbums/categories'
    )
  );
}

export async function list(request: ContentManagementRequest) {
  return await SkyAPI.requestJSON<PhotoAlbum[]>(
    'https://api.sky.blackbaud.com/school/v1/contentmanagement/photoalbums/list',
    'POST',
    JSON.stringify(request),
    { 'Content-Type': 'application/json' }
  );
}

export async function photosById(album_id: number) {
  return new Paginated<MediaItem>(
    await SkyAPI.requestJSON<MediaItemCollection>(
      `https://api.sky.blackbaud.com/school/v1/contentmanagement/photoalbums/${album_id}`
    )
  );
}
