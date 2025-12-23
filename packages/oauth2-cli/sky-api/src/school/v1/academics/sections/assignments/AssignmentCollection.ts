import { URLString } from '@battis/descriptive-types';
import { Assignment } from './Assignment.js';

export type AssignmentCollection = {
  count?: number;
  next_link?: URLString;
  value: Assignment[];
};
