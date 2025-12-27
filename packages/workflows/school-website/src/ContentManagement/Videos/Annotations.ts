import { PathString } from '@battis/descriptive-types';
import { Entities } from 'datadirect';

export type AnnotatedVideo = Entities.Videos.Video & {
  file_path?: PathString;
  cover_file_path?: PathString;
};

export type AnnotatedVideoCategory = Entities.Videos.Cateogry_EditResponse & {
  video_items?: AnnotatedVideo[];
};
