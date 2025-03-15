import * as Assignments from './Assignments.js';
import * as BulletinBoard from './BulletinBoard.js';
import * as GradeBook from './GradeBook.js';
import * as Metadata from './Metadata.js';
import * as SectionInfo from './SectionInfo.js';
import * as Topics from './Topics.js';

export type Data = {
  Metadata: Metadata.Data;
  GroupId: number;
  SectionInfo?: SectionInfo.Data;
  BulletinBoard?: BulletinBoard.Data;
  Topics?: Topics.Data;
  Assignments?: Assignments.Data;
  Gradebook?: GradeBook.Data;
};
