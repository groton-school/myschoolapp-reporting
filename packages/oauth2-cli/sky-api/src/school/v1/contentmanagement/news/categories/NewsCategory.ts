import { URLString } from '@battis/descriptive-types';
import { RoleModel } from '../../RoleModel.js';
import { ImageSettings } from '../../photoalbums/categories/ImageSettings.js';

export type NewsCategory = {
  category_id?: number;
  category_name?: string;
  allow_user_management?: boolean;
  show_brief_description?: boolean;
  show_long_description?: boolean;
  association_id?: number;
  association_name?: string;
  rss_ind?: boolean;
  allow_coments?: string;
  comment_approval?: string;
  rss_feed?: URLString;
  is_public?: boolean;
  access_roles?: RoleModel[];
  image_settings?: ImageSettings;
};
