import { EmailString, NumericString } from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';
import { AssignmentGrade } from './AssignmentGrade.js';

export type RosterEntry = {
  AssignmentId: number;
  StudentUserId: number;
  SectionGrade: number;
  SectionGradeYear: number;
  SectionGradeLastPeriod: number;
  Firstname: string;
  Lastname: string;
  GradYear: NumericString;
  Nickname: string;
  Email: EmailString;
  HomePhone: string;
  CellPhone: string;
  PhotoFileNameLarge: string;
  LpInd: boolean;
  StudentDisplay: string;
  StudentFirstLastDisplay: string;
  EnrollmentDescription: string;
  AssignmentGrades: AssignmentGrade[];
  DroppedInd: boolean;
  LearningProfiles: JSONValue[]; // TODO DataDirect/GradeBookMarkingPeriodList.RosterEntry.LearningProfiles type
  SortOrder: number;
  SectionId: number;
  MarkingPeriodId: number;
  SectionGradeDisplay: string;
  StudentNameAvatar: string;
  StudentNameFormatted: string;
};

export type Roster = RosterEntry[];
