import { PathString } from '@battis/descriptive-types';
import { SkyAPI } from '@oauth2-cli/sky-api';

export type AnnotatedMediaItem =
  SkyAPI.school.v1.contentmanagement.photoalbums.MediaItem & {
    file_path?: PathString;
    thumbnail_file_path?: PathString;
  };

export type AnnotatedPhotoAlbum =
  SkyAPI.school.v1.contentmanagement.photoalbums.PhotoAlbum & {
    media?: AnnotatedMediaItem[];
  };

export type AnnotatedPhotoCategory =
  SkyAPI.school.v1.contentmanagement.photoalbums.PhotoCategory & {
    albums?: AnnotatedPhotoAlbum[];
  };
