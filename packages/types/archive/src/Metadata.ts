import { DateTimeString } from '@battis/descriptive-types';
import * as Snapshot from '@msar/types.snapshot';

export type Data<D = DateTimeString> = Snapshot.Metadata.Data<D>;
