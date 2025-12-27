import { Access } from './Access.js';
import { Assignment } from './Assignment.js';
import { DisplayOptions } from './DisplayOptions.js';
import { Roster } from './Roster.js';
import { Summary } from './Summary.js';

export type Gradebook = {
  DisplayOptions: DisplayOptions;
  Roster: Roster;
  Assignments: Assignment[];
  Summary: Summary;
  Access: Access;
};
