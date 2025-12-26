import { PathString } from '@battis/descriptive-types';
import { api } from 'datadirect';

export type AnnotatedVideo = api.Video.List.VideoItem & {
  file_path?: PathString;
  cover_file_path?: PathString;
};

export type AnnotatedVideoCategory = api.VideoCategory.edit.Response & {
  video_items?: AnnotatedVideo[];
};
