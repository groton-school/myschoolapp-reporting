import {
  DateTimeString,
  HTMLString,
  URLString
} from '@battis/descriptive-types';

// TODO assessment/AssessmentGetSpa types

type MultipleChoiceAnswer = {
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  IsCorrect: boolean;
  SortOrder: number;
  Description: HTMLString;
  Selected: boolean;
  NumberSelected: number;
  PercentSelected: number;
  DisplayOrder: number;
  SelectedMatchId: number;
};

type MultipleChoice = {
  AssessmentQuestionId: number;
  QuestionTypeId: 3;
  SortOrder: number;
  Points: number;
  Description: HTMLString;
  Answers: MultipleChoiceAnswer[];
  QuestionType: 'Multi Choice';
  PossibleAnswers: string;
  CharacterLimit: number;
  UseEditor: boolean;
  NumberCorrect: number;
  NumberIncorrect: number;
  NumberPartial: number;
  NumberAwaiting: number;
  PercentCorrect: number;
  AlbumId: number;
  DownloadId: number;
  ContentId: number;
  Checkboxes: boolean;
  AssessmentId: number;
  RandomizeAnswers: boolean;
  PartialCredit: boolean;
  MatchingAnswers: any[];
  AssessmentQuestionSubBankId: number;
  AssessmentQuestionBankId: number;
  ModifiedDate: DateTimeString;
  InsertDate: DateTimeString;
  AIGenerated: boolean;
};

type FillInTheBlankAnswer = {
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  IsCorrect: boolean;
  SortOrder: number;
  Description: string;
  Selected: boolean;
  NumberSelected: number;
  PercentSelected: number;
  DisplayOrder: number;
  SelectedMatchId: number;
};

type FillInTheBlank = {
  AssessmentQuestionId: number;
  QuestionTypeId: 2;
  SortOrder: number;
  Points: number;
  Description: HTMLString;
  Answers: FillInTheBlankAnswer[];
  QuestionType: 'Fill in the Blank';
  PossibleAnswers: string;
  CharacterLimit: number;
  UseEditor: boolean;
  NumberCorrect: number;
  NumberIncorrect: number;
  NumberPartial: number;
  NumberAwaiting: number;
  PercentCorrect: number;
  AlbumId: number;
  DownloadId: number;
  ContentId: number;
  Checkboxes: boolean;
  AssessmentId: number;
  RandomizeAnswers: boolean;
  PartialCredit: boolean;
  MatchingAnswers: any[];
  AssessmentQuestionSubBankId: number;
  AssessmentQuestionBankId: number;
  ModifiedDate: DateTimeString;
  InsertDate: DateTimeString;
  AIGenerated: boolean;
};

type Essay = {
  AssessmentQuestionId: number;
  QuestionTypeId: 1;
  SortOrder: number;
  Points: number;
  Description: HTMLString;
  Answers: any[];
  QuestionType: 'Essay';
  PossibleAnswers: string;
  CharacterLimit: number;
  UseEditor: boolean;
  NumberCorrect: number;
  NumberIncorrect: number;
  NumberPartial: number;
  NumberAwaiting: number;
  PercentCorrect: number;
  AlbumId: number;
  DownloadId: number;
  ContentId: number;
  Checkboxes: boolean;
  AssessmentId: number;
  RandomizeAnswers: boolean;
  PartialCredit: boolean;
  MatchingAnswers: any[];
  AssessmentQuestionSubBankId: number;
  AssessmentQuestionBankId: number;
  ModifiedDate: DateTimeString;
  InsertDate: DateTimeString;
  AIGenerated: boolean;
};

type TrueFalseAnswer = {
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  IsCorrect: boolean;
  SortOrder: number;
  Description: 'True' | 'False';
  Selected: boolean;
  NumberSelected: number;
  PercentSelected: number;
  DisplayOrder: number;
  SelectedMatchId: number;
};

type TrueFalse = {
  AssessmentQuestionId: number;
  QuestionTypeId: 4;
  SortOrder: number;
  Points: number;
  Description: HTMLString;
  Answers: TrueFalseAnswer[];
  QuestionType: 'True/False';
  PossibleAnswers: string;
  CharacterLimit: number;
  UseEditor: boolean;
  NumberCorrect: number;
  NumberIncorrect: number;
  NumberPartial: number;
  NumberAwaiting: number;
  PercentCorrect: number;
  AlbumId: number;
  DownloadId: number;
  ContentId: number;
  Checkboxes: boolean;
  AssessmentId: number;
  RandomizeAnswers: boolean;
  PartialCredit: boolean;
  MatchingAnswers: any[];
  AssessmentQuestionSubBankId: number;
  AssessmentQuestionBankId: number;
  ModifiedDate: DateTimeString;
  InsertDate: DateTimeString;
  AIGenerated: boolean;
};

type MatchingAnswer = {
  AssessmentQuestionAnswerMatchId: number;
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  SortOrder: number;
  Description: HTMLString;
  Selected: boolean;
  DisplayOrder: number;
};

type MatchingAnswerPair = {
  AssessmentQuestionAnswerId: number;
  AssessmentQuestionId: number;
  IsCorrect: boolean;
  SortOrder: number;
  Description: HTMLString;
  Selected: boolean;
  NumberSelected: number;
  PercentSelected: number;
  DisplayOrder: number;
  MatchingAnswer: MatchingAnswer;
  SelectedMatchId: number;
};

type Matching = {
  AssessmentQuestionId: number;
  QuestionTypeId: 5;
  SortOrder: number;
  Points: number;
  Description: string;
  Answers: MatchingAnswerPair[];
  QuestionType: 'Matching';
  PossibleAnswers: string;
  CharacterLimit: number;
  UseEditor: boolean;
  NumberCorrect: number;
  NumberIncorrect: number;
  NumberPartial: number;
  NumberAwaiting: number;
  PercentCorrect: number;
  AlbumId: number;
  DownloadId: number;
  ContentId: number;
  Checkboxes: boolean;
  AssessmentId: number;
  RandomizeAnswers: boolean;
  PartialCredit: boolean;
  MatchingAnswers: MatchingAnswer[];
  AssessmentQuestionSubBankId: number;
  AssessmentQuestionBankId: number;
  ModifiedDate: DateTimeString;
  InsertDate: DateTimeString;
  AIGenerated: boolean;
};

type Question = MultipleChoice | FillInTheBlank | Essay | TrueFalse | Matching;

type Photo = {
  Id: 10743810;
  FilePath: URLString;
  LargeFilenameUrl: URLString;
  LargeFilename: string;
  LargeHeight: number;
  LargeWidth: number;
  ThumbFilenameUrl: URLString;
  ThumbFilename: URLString;
  ThumbWidth: number;
  ThumbHeight: number;
  ZoomFilenameUrl: URLString;
  ZoomWidth: number;
  ZoomHeight: number;
  OriginalFilenameUrl: URLString;
  OriginalFilename: string;
  OriginalWidth: number;
  OriginalHeight: number;
  EditedWidth: number;
  EditedHeight: number;
  PhotoEditSettings: string;
  Title: string;
  Caption: string;
  photo_alttext: string;
  hover_alttext: string;
  LongDescription: HTMLString; // TODO verify Assessment/AssessmentGetSpa/Response.Photo.LongDescription type (may just be string)
  TagList: any[];
  FileEdited: boolean;
  IsHoverPhoto: boolean;
  PhotoEapEnabled: boolean;
  ImageOps: any[];
  OriginalFilenameEditedUrl: URLString;
  LargeFilenameEditedUrl: URLString;
  ZoomFilenameEditedUrl: URLString;
  ThumbFilenameEditedUrl: URLString;
  PhotoTypeId: number;
  PhotoWidth: number;
  PhotoPK: number;
  InsertDate: DateTimeString;
  LastModifyDate: DateTimeString;
  LastModifyUserId: number;
};

export type Response = {
  AssignmentId: number;
  AssessmentId: number;
  AssessmentDescription: string;
  Questions: Question[];
  ShowTime: boolean;
  ShowScore: boolean;
  ShowTryAgain: boolean;
  ShowAnswers: boolean;
  ShowOnComplete: boolean;
  RestrictResults: boolean;
  ScoreOnly: boolean;
  QuestionCount: number;
  EssayCount: number;
  FillInCount: number;
  MultipleChoiceCount: number;
  TrueFalseCount: number;
  MatchingCount: number;
  TimeToComplete: number;
  PreviewShowTime: boolean;
  PreviewShowPoints: boolean;
  PreviewShowQuestionCounts: boolean;
  LastSavedDate: DateTimeString;
  Photos: Photo[];
  ReadyForTaking: boolean;
  IsOwner: boolean;
};
