import { NumericDuration } from '@battis/descriptive-types';

export type Data<D = Date> = {
  Host: string;
  User: string;
  Start: D;
  Finish: D;
  Elapsed?: NumericDuration;
};
