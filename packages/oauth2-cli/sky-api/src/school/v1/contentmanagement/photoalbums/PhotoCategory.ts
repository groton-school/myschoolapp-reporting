import { RoleModel } from '../RoleModel.js';
import { ImageSettings } from './ImageSettings.js';

export type PhotoCategory = {
  id?: number;
  description?: string;
  include_description_for_photos?: boolean;
  is_public?: boolean;
  access_roles?: RoleModel[];
  image_settings?: ImageSettings;
};
