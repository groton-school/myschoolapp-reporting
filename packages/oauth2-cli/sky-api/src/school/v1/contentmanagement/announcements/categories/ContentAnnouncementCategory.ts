import { URLString } from '@battis/descriptive-types';
import { RoleModel } from './RoleModel.js';

export type ContentAnnouncementCategory = {
  category_id?: number;
  category_name?: string;
  allow_user_management?: boolean;
  rss_enabled?: boolean;
  rss_feed?: URLString;
  is_public?: boolean;
  access_roles?: RoleModel;
};
