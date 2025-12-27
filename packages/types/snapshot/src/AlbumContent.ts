import { PathString } from '@battis/descriptive-types';
import { Entities } from 'datadirect';

export type Item<T = PathString> = {
  AlbumId: number;
  Content: (Omit<
    Entities.Media.Media,
    | 'FilenameUrl'
    | 'ThumbFilenameUrl'
    | 'OriginalFilenameUrl'
    | 'FilenameEditedUrl'
    | 'ThumbFilenameEditedUrl'
    | 'OriginalFilenameEditedUrl'
  > & {
    FilenameUrl: T;
    ThumbFilenameUrl: T;
    OriginalFilenameUrl: T;
    FilenameEditedUrl: T;
    ThumbFilenameEditedUrl: T;
    OriginalFilenameEditedUrl: T;
  })[];
};

export type Data<T = PathString> = Item<T>[];
