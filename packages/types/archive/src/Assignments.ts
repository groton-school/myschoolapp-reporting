import { PathString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';
import { Annotation } from './Annotation.js';

export type Item<T = PathString | Annotation> = Snapshot.Assignments.Item<T>;
export type Data<T = PathString | Annotation> = Snapshot.Assignments.Data<T>;
