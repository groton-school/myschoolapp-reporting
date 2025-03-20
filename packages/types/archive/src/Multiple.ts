import { DateTimeString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';
import { PotentialAnnotation } from './Annotation.js';

export type Item<
  T = PotentialAnnotation,
  D = DateTimeString
> = Snapshot.Multiple.Item<T, D>;
export type Data<
  T = PotentialAnnotation,
  D = DateTimeString
> = Snapshot.Multiple.Data<T, D>;
