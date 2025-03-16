import { DateTimeString, PathString } from '@battis/descriptive-types';

export type Annotation = {
  original: PathString;
  accessed: DateTimeString;
} & ({ localPath: PathString; filename: string } | { error: string });

export function isAnnotated(obj: object): obj is Annotation {
  return obj !== null && 'original' in obj && 'accessed' in obj;
}
