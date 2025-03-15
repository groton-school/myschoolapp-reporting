import { DateTimeString, PathString } from '@battis/descriptive-types';

export type Annotation = {
  original: PathString;
  accessed: DateTimeString;
  localPath: PathString;
  filename: string;
};
