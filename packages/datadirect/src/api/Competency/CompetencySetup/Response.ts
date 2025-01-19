type LevelSettings = {
  LevelNum: number;
  LevelDescription: string;
  MasteryUseLabel: string;
  TransSkillUse: boolean;
  ContentSkillUse: boolean;
  SkillsUsedLabel: string;
  RatingDisplayLabelStudent: string;
  DisplayFormatLabelOnly: string;
  DisplayFormatRatingLabel: string;
  MasteryAccessStudent: boolean;
  MasteryAccessParent: boolean;
  MasteryAccessTeacher: boolean;
  MasteryAccessAdvisor: boolean;
  MasteryAccessAllSchoolAdvisor: boolean;
  MasteryAccessCoach: boolean;
  MasteryAccessDorm: boolean;
  MasteryAccessLabel: string;
  CompMethodLabel: string;
  UseNTimes: boolean;
  AllowTeacherCompMethod: boolean;
  HasGrades: boolean;
  HasAssignments: boolean;
  ClassLevelCompMethodLabel: string;
  ClassLevelUseNTimes: boolean;
};

export type Response = {
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
  LevelSettings: LevelSettings[];
  RatingScale: any[]; // TODO Competency/CompetencySetup.Response.RatingScale type
  TransSkillCategoriesList: any[]; // TODO Competency/CompetencySetup.Response.TransSkillCategoriesList type
  ContentAreaCategoriesList: any[]; // TODO Competency/CompetencySetup.Response.ContentAreaCategoriesList type
};
