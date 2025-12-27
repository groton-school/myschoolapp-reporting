import { JSONValue } from '@battis/typescript-tricks';
import { LevelSetting } from './LevelSetting.js';

export type Setup = {
  TransSkillLabel: string;
  UseTransSubSkill: boolean;
  TransSubSkillLabel: string;
  ContentSkillLabel: string;
  UseContentSubSkill: boolean;
  ContentSubSkillLabel: string;
  ContentSubSkillAllowTeacher: boolean;
  TransSubSkillInUse: boolean;
  ContentSubSkillInUse: boolean;
  TransSkillInUse: boolean;
  ContentSkillInUse: boolean;
  LevelSettings: LevelSetting[];
  RatingScale: JSONValue[]; // TODO Competency/CompetencySetup.Response.RatingScale type
  TransSkillCategoriesList: JSONValue[]; // TODO Competency/CompetencySetup.Response.TransSkillCategoriesList type
  ContentAreaCategoriesList: JSONValue[]; // TODO Competency/CompetencySetup.Response.ContentAreaCategoriesList type
};
