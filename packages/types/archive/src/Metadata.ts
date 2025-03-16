import { DateTimeString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';

export type Data = Snapshot.Data['Metadata'] & {
  Start: DateTimeString;
  Finish: DateTimeString;
};
