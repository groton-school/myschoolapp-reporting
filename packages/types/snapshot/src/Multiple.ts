import { PathString } from '@battis/descriptive-types';
import * as Snapshot from './Snapshot.js';

export type Item<T = PathString, D = Date> = Snapshot.Data<T, D>;
export type Data<T = PathString, D = Date> = Item<T, D>[];
