import { PathString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';
import { Annotation } from './Annotation.js';

export type Item<T = PathString | Annotation> = Snapshot.Topics.Item<T>;
export type Topic<T = PathString | Annotation> = Snapshot.Topics.Topic<T>;
export type Data<T = PathString | Annotation> = Snapshot.Topics.Data<T>;
