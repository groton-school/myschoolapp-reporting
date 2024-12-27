// TODO DataDirect/GradeBookMarkingPeriodList.DisplayOptions many probably inaccurate null properties
export type DisplayOptions = {
  Orderby: string;
  Aord: string;
  Weeks: string;
  Dfrom: null;
  Dto: null;
  MpBeginDate: DateTimeString;
  MpEndDate: DateTimeString;
  DisplayCumGrade: boolean;
  GroupBy: number;
  DisplayAdvisor: number;
  DisplayAdvisorComments: number;
  DisplayAdvisorCum: number;
  DisplayDormsup: number;
  DisplayDormsupComments: number;
  DisplayDormsupCum: number;
  DisplayParent: number;
  DisplayParentComments: number;
  DisplayParentCum: number;
  DisplayStudent: number;
  DisplayStudentComments: number;
  DisplayStudentCum: number;
  DisplayMyAdvisor: number;
  DisplayMyAdvisorComments: number;
  DisplayMyAdvisorCum: number;
  DisplayCoach: number;
  DisplayCoachComments: number;
  DisplayCoachCum: number;
  DisplayAdvisorStart: null;
  DisplayAdvisorEnd: null;
  DisplayDormsupStart: null;
  DisplayDormsupEnd: null;
  DisplayParentStart: null;
  DisplayParentEnd: null;
  DisplayStudentStart: null;
  DisplayStudentEnd: null;
  DisplayMyAdvisorStart: null;
  DisplayMyAdvisorEnd: null;
  DisplayAdvisorCommentsStart: null;
  DisplayAdvisorCommentsEnd: null;
  DisplayDormsupCommentsStart: null;
  DisplayDormsupCommentsEnd: null;
  DisplayParentCommentsStart: null;
  DisplayParentCommentsEnd: null;
  DisplayStudentCommentsStart: null;
  DisplayStudentCommentsEnd: null;
  DisplayMyAdvisorCommentsStart: null;
  DisplayMyAdvisorCommentsEnd: null;
  ViewableByAdvisor: number;
  ViewableByAdvisorComments: number;
  ViewableByAdvisorCum: number;
  ViewableByAdvisorCumYear: number;
  ViewableByDormsup: number;
  ViewableByDormsupComments: number;
  ViewableByDormsupCum: number;
  ViewableByDormsupCumYear: number;
  ViewableByParent: number;
  ViewableByParentComments: number;
  ViewableByParentCum: number;
  ViewableByParentCumYear: number;
  ViewableByStudent: number;
  ViewableByStudentComments: number;
  ViewableByStudentCum: number;
  ViewableByStudentCumYear: number;
  ViewableByMyAdvisor: number;
  ViewableByMyAdvisorComments: number;
  ViewableByMyAdvisorCum: number;
  ViewableByMyAdvisorCumYear: number;
  ViewableByCoach: number;
  ViewableByCoachComments: number;
  ViewableByCoachCum: number;
  ViewableByCoachCumYear: number;
  DisplayCumGradeYear: boolean;
  DisplayYearCum: boolean;
  DisplayAssignTitle: boolean;
  DisplayAssignType: boolean;
  DisplayDateAssign: boolean;
  DisplayDateDue: boolean;
  DisplayMaxPoint: boolean;
  DisplayAdvisorCumStart: null;
  DisplayAdvisorCumEnd: null;
  DisplayDormsupCumStart: null;
  DisplayDormsupCumEnd: null;
  DisplayParentCumStart: null;
  DisplayParentCumEnd: null;
  DisplayStudentCumStart: null;
  DisplayStudentCumEnd: null;
  DisplayMyAdvisorCumStart: null;
  DisplayMyAdvisorCumEnd: null;
  DisplayCoachStart: null;
  DisplayCoachEnd: null;
  DisplayCoachCommentsStart: null;
  DisplayCoachCommentsEnd: null;
  DisplayCoachCumStart: null;
  DisplayCoachCumEnd: null;
  DisplayCoachCumYear: number;
  DisplayCoachCumYearStart: null;
  DisplayCoachCumYearEnd: null;
  DisplayAdvisorCumYear: number;
  DisplayAdvisorCumYearStart: null;
  DisplayAdvisorCumYearEnd: null;
  DisplayDormsupCumYear: number;
  DisplayDormsupCumYearStart: null;
  DisplayDormsupCumYearEnd: null;
  DisplayParentCumYear: number;
  DisplayParentCumYearStart: null;
  DisplayParentCumYearEnd: null;
  DisplayStudentCumYear: number;
  DisplayStudentCumYearStart: null;
  DisplayStudentCumYearEnd: null;
  DisplayMyAdvisorCumYear: number;
  DisplayMyAdvisorCumYearStart: null;
  DisplayMyAdvisorCumYearEnd: null;
  MasteryUse: -2147483648;
  AllowTeacherCompMethod: boolean;
  ShowOnlineSub: boolean;
  ShowAssessmentSub: boolean;
  LevelNum: 951;
  DisplaySkillsInitially: boolean;
  DisplaySkillCode: boolean;
  DisplaySkillName: boolean;
  DisplayAbsentIndicator: boolean;
  DisplayTardyIndicator: boolean;
  DisplayCommentIndicator: boolean;
  DisplayIncompleteIndicator: boolean;
  DisplayLateIndicator: boolean;
  DisplayMissingIndicator: boolean;
  DisplayExemptIndicator: boolean;
  DisplayEvaluationExceedsMaxIndicator: boolean;
  DisplayCollectedIndicator: boolean;
  DisplaySubmittedIndicator: boolean;
  DisplayDroppedStudents: boolean;
  SortColumnsDesc: boolean;
  UseCustomSort: boolean;
  DisplayCumGradeLastPeriod: boolean;
  DisplayDroppedIndicator: boolean;
  ShowAssignmentTypePercent: boolean;
  ShowGradePercent: boolean;
  AssignmentTypesFilterList: [];
};

export type AssignmentGrade = {
  AssignmentId: number;
  AssignmentIndexId: number;
  StudentUserId: number;
  ValueId: number;
  PointsEarned?: number;
  Comment: string;
  AttendanceRequired: boolean;
  Exempt: boolean;
  Incomplete: boolean;
  Late: boolean;
  AA: string;
  AD: string;
  Missing: boolean;
  RubricInd: boolean;
  TA: string;
  TD: string;
  EvaluationMethod: number;
  FormativeInd: boolean;
  AssessmentInd: boolean;
  AssignmentSkillList: any[]; // TODO DataDirect/GradeBookMarkingPeriodList.AssignmentGrade.AssignmentSkillList type
  DropboxResub: boolean;
  Letter: string;
  MarkingPeriodId: number;
  AssignmentTypeId: number;
  AssignmentType: string;
  MaxPoints: number;
  Collected: boolean;
  SubmittedInd: boolean;
  LockedInd: boolean;
  SectionId: number;
  NewAssessmentInd: boolean;
  AssessmentSubmittedDate?: DateTimeString;
  AttachmentId: number;
  DropBoxInd: boolean;
  Dropped: boolean;
  SortGrade?: number;
  DiscussionInd: boolean;
  AssessmentId: number;
};

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
  LearningProfiles: any[]; // TODO DataDirect/GradeBookMarkingPeriodList.RosterEntry.LearningProfiles type
  SortOrder: number;
  SectionId: number;
  MarkingPeriodId: number;
  SectionGradeDisplay: string;
  StudentNameAvatar: string;
  StudentNameFormatted: string;
};

export type Roster = RosterEntry[];

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
  AssignmentSkillList: any[]; // TODO DataDirect/GradeBookMarkingPeriodList.Assignment.AssignmentSkillList type
  MarkingPeriodId: number;
  NumberToDrop: number;
  Weight: number;
  AssignmentTypeId: number;
  SectionId: number;
  NewAssessmentInd: boolean;
  DropBoxInd: boolean;
};

export type Summary = {
  ActiveStudentCount: number;
  DroppedStudentCount: number;
  AssignmentCount: number;
  GroupName: string;
  Teachers: string;
  CalculationMethod: number;
  IsSetupByYear: boolean;
};

export type Access = {
  IsParentOrStudent: boolean;
  HasGradeAccess: boolean;
  HasCommentAccess: boolean;
  HasCumulativeAccess: boolean;
  HasYearCumulativeAccess: boolean;
  IsManager: boolean;
  ShowGradebookCalc: boolean;
  ShowMasteryCalc: boolean;
  IsOwner: boolean;
};

export type Response = {
  DisplayOptions: DisplayOptions;
  Roster: Roster;
  Assignments: Assignment[];
  Summary: Summary;
  Access: Access;
};
