import * as Snapshot from '@msar/types.snapshot';
import * as Assignments from './Assignments.js';
import * as BulletinBoard from './BulletinBoard.js';
import * as Metadata from './Metadata.js';
import * as Topics from './Topics.js';

export type Data = Snapshot.Data & {
  Metadata: Metadata.Data;
  Assignments: Assignments.Data;
  BulletinBoard: BulletinBoard.Data;
  Topics: Topics.Data;
};
