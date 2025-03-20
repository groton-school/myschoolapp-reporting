import { DateTimeString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';
import { PotentialAnnotation } from './Annotation.js';

export type Data<T = PotentialAnnotation, D = DateTimeString> = Snapshot.Data<
  T,
  D
>;
