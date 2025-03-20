import * as Snapshot from '@msar/types.snapshot';
import { PotentialAnnotation } from './Annotation.js';

export type Item<T = PotentialAnnotation> = Snapshot.Topics.Item<T>;
export type Topic<T = PotentialAnnotation> = Snapshot.Topics.Topic<T>;
export type Data<T = PotentialAnnotation> = Snapshot.Topics.Data<T>;
