import { NumericString } from '@battis/descriptive-types';

export type Task = {
  TaskId: number;
  ApplicationId: number;
  TaskTypeId: number;
  Description: string;
  HashString: string;
  TaskRef: string;
  Personas: string;
  Roles: NumericString;
  RoleTypes: NumericString;
};
