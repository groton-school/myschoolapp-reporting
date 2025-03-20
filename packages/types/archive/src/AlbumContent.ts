import { AlbumContent } from '@msar/types.snapshot';
import { PotentialAnnotation } from './Annotation.js';

export type Item<T = PotentialAnnotation> = AlbumContent.Item<T>;
export type Data<T = PotentialAnnotation> = AlbumContent.Data<T>;
