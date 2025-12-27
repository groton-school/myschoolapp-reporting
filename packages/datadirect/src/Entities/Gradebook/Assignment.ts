import { DateString, DateTimeString } from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';

export type Assignment = {
  AssignmentId: number;
  IncCumGrade: number;
  ExtraCredit: number;
  MaxPoints: number;
  Code: string;
  DateAssigned: DateString;
  SortDateAssigned: DateTimeString;
  DateDue: DateString;
  SortDateDue: DateTimeString;
  AbbrDescription: string;
  AssignShort: string;
  AssignDate: DateTimeString;
  Factor: number;
  PublishGrade: boolean;
  AssessmentInd: boolean;
  DiscussionInd: boolean;
  RubricInd: boolean;
  AssignmentIndexId: number;
  AssignmentType: string;
  EvaluationMethod: number;
  FormativeInd: boolean;
  AssignmentSkillList: JSONValue[]; // TODO DataDirect/GradeBookMarkingPeriodList.Assignment.AssignmentSkillList type
  MarkingPeriodId: number;
  NumberToDrop: number;
  Weight: number;
  AssignmentTypeId: number;
  SectionId: number;
  NewAssessmentInd: boolean;
  DropBoxInd: boolean;
};
