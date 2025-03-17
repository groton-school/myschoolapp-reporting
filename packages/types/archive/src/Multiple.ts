import { DateTimeString, PathString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';
import { Annotation } from './Annotation.js';

export type Item<
  T = PathString | Annotation,
  D = DateTimeString
> = Snapshot.Multiple.Item<T, D>;
export type Data<
  T = PathString | Annotation,
  D = DateTimeString
> = Snapshot.Multiple.Data<T, D>;
