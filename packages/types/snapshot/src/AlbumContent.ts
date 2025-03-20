import { PathString } from '@battis/descriptive-types';
import { api } from 'datadirect';

export type Item<T = PathString> = {
  AlbumId: number;
  Content: (Omit<
    api.media.AlbumFilesGet.Response,
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
