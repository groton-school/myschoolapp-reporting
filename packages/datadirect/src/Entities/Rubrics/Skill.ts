import { Level } from './Level.js';

export type Skill = {
  Id: number;
  Name: string;
  SortOrder: number;
  Levels: Level[];
};
