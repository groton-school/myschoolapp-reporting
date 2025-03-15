import * as Snapshot from '@msar/types.snapshot';
import { Content } from './ContentItem.js';

export type Item = Snapshot.BulletinBoard.Item & { Content: Content };

export type Data = Item[];
