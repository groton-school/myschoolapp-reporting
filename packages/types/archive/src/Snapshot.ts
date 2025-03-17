import { DateTimeString, PathString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';
import { Annotation } from './Annotation.js';

export type Data<
  T = PathString | Annotation,
  D = DateTimeString
> = Snapshot.Data<T, D>;
