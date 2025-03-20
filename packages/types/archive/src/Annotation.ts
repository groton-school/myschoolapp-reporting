import { DateTimeString, PathString } from '@battis/descriptive-types';

export type PotentialAnnotation = PathString | Annotation;

export type Annotation = {
  original: PathString;
  accessed: DateTimeString;
} & (
  | { localPath: PathString; filename: string; error: never }
  | { localPath: never; filename: never; error: string }
);

export function isAnnotated(obj: object): obj is Annotation {
  return obj !== null && 'original' in obj && 'accessed' in obj;
}
