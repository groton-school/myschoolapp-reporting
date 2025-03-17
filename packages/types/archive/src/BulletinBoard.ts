import { PathString } from '@battis/descriptive-types';
import * as Snapashot from '@msar/types.snapshot';
import { Annotation } from './Annotation.js';

export type Item<T = PathString | Annotation> = Snapashot.BulletinBoard.Item<T>;
export type Data<T = PathString | Annotation> = Snapashot.BulletinBoard.Data<T>;
