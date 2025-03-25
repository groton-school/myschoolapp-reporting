import { HTMLString, NumericString } from '@battis/descriptive-types';

export type Level = {
  Id: number;
  SkillId: number;
  Name: string;
  Description: HTMLString;
  Value: NumericString;
  SortOrder: number;
  Points: NumericString;
};

export type Skill = {
  Id: number;
  Name: string;
  SortOrder: number;
  Levels: Level[];
};

export type Response = {
  Id: number;
  Name: string;
  Description: HTMLString;
  EvaluationType: number;
  Skills: Skill[];
  UserId: number;
  BankInd: boolean;
  AdminInd: boolean;
  Grades: [];
  Departments: [];
  Points: number;
};
