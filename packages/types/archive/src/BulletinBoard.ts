import * as Snapshot from '@msar/types.snapshot';
import { PotentialAnnotation } from './Annotation.js';

export type Item<T = PotentialAnnotation> = Snapshot.BulletinBoard.Item<T>;
export type Data<T = PotentialAnnotation> = Snapshot.BulletinBoard.Data<T>;
