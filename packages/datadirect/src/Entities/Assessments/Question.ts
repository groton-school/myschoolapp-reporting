import * as Questions from './Questions/index.js';

export type Question =
  | Questions.MultipleChoice.Prompt
  | Questions.FillInTheBlank.Prompt
  | Questions.Essay.Prompt
  | Questions.TrueFalse.Prompt
  | Questions.Matching.Prompt;
