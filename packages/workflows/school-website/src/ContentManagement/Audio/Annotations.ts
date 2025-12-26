import { PathString } from '@battis/descriptive-types';
import { api } from 'datadirect';

export type AnnotatedPhotoItem = api.audio.edit.PhotoItem & {
  large_file_path?: PathString;
  large_file_edited_path?: PathString;
  thumb_file_path?: PathString;
  thumb_file_edited_path?: PathString;
  zoom_file_path?: PathString;
  zoom_file_edited_path?: PathString;
  original_file_path?: PathString;
  original_file_edited_path?: PathString;
};

export type AnnotatedAudioItem = api.audio.edit.AudioItem & {
  file_path?: PathString;
  file_edited_path?: PathString;
  thumb_file_path?: PathString;
  thumb_file_edited_path?: PathString;
  transcript_file_path?: PathString;
  original_file_path?: PathString;
  original_file_edited_Path?: PathString;
};

export type AnnotatedAudioAlbum = Omit<
  api.audio.edit.Response,
  'Photos' | 'Files'
> & {
  Photos?: AnnotatedPhotoItem[];
  Files?: AnnotatedAudioItem[];
  cover_file_path?: PathString;
};

export type AnnotatedAudioCategory = api.AudioCategory.AudioCategory & {
  albums?: AnnotatedAudioAlbum[];
};
