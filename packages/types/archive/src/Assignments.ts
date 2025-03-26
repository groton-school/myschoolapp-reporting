import * as Snapshot from '@msar/types.snapshot';
import { PotentialAnnotation } from './Annotation.js';

export type Item<T = PotentialAnnotation> = Snapshot.Assignments.Item<T>;
export type Data<T = PotentialAnnotation> = Item<T>[];
