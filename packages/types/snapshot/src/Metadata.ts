import { NumericDuration } from '@battis/descriptive-types';

export type Data = {
  Host: string;
  User: string;
  Start: Date;
  Finish: Date;
  Elapsed?: NumericDuration;
};
