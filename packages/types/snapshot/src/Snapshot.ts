import { PathString } from '@battis/descriptive-types';
import * as Assignments from './Assignments.js';
import * as BulletinBoard from './BulletinBoard.js';
import * as GradeBook from './GradeBook.js';
import * as Metadata from './Metadata.js';
import * as SectionInfo from './SectionInfo.js';
import * as Topics from './Topics.js';

export type Data<T = PathString, D = Date> = {
  Metadata: Metadata.Data<D>;
  GroupId: number;
  SectionInfo?: SectionInfo.Data;
  BulletinBoard?: BulletinBoard.Data<T>;
  Topics?: Topics.Data<T>;
  Assignments?: Assignments.Data<T>;
  Gradebook?: GradeBook.Data;
};
