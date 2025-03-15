import { ArrayElement } from '@battis/typescript-tricks';
import * as Snapshot from '@msar/types.snapshot';
import { Annotation } from './Annotation.js';

type LinkItem = ArrayElement<Snapshot.Assignments.Item['LinkItems']> & {
  LinkImageUrl: Annotation;
  HoverImageUrl: Annotation;
};

type DownloadItem = ArrayElement<Snapshot.Assignments.Item['DownloadItems']> & {
  DownloadUrl: Annotation;
};

export type Item = Snapshot.Assignments.Item & {
  LinkItems: LinkItem[];
  DownloadItems: DownloadItem[];
  Discussion: Snapshot.Assignments.Item['Discussion'] & {
    PhotoFilename: Annotation;
  };
};

export type Data = Item[];
