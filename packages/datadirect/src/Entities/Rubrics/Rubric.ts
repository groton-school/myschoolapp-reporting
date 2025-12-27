import { HTMLString } from '@battis/descriptive-types';
import { Skill } from './Skill.js';

export type Rubric = {
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
