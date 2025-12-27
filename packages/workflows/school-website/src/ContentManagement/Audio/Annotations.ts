import { PathString } from '@battis/descriptive-types';
import { Entities } from 'datadirect';

export type AnnotatedPhoto = Entities.Photos.PhotoAttachment & {
  large_file_path?: PathString;
  large_file_edited_path?: PathString;
  thumb_file_path?: PathString;
  thumb_file_edited_path?: PathString;
  zoom_file_path?: PathString;
  zoom_file_edited_path?: PathString;
  original_file_path?: PathString;
  original_file_edited_path?: PathString;
};

export type AnnotatedAudio = Entities.Audio.Audio & {
  file_path?: PathString;
  file_edited_path?: PathString;
  thumb_file_path?: PathString;
  thumb_file_edited_path?: PathString;
  transcript_file_path?: PathString;
  original_file_path?: PathString;
  original_file_edited_Path?: PathString;
};

export type AnnotatedAlbum = Omit<
  Entities.Audio.Album_EditResponse,
  'Photos' | 'Files'
> & {
  Photos?: AnnotatedPhoto[];
  Files?: AnnotatedAudio[];
  cover_file_path?: PathString;
};

export type AnnotatedCategory = Entities.Audio.Category & {
  albums?: AnnotatedAlbum[];
};
