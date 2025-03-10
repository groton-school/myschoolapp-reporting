import { DateString, NumericTimestamp } from '@battis/descriptive-types';

export type Item = {
  AllowCopy: boolean;
  AllowEdit: boolean;
  Description?: string | null;
  ExpireDate?: DateString | null;
  Name: string;
  PublishDate: DateString;
  PublishDateTicks: NumericTimestamp;
  ThumbFilename?: string | null;
  TopicID: number;
  TopicIndexID: number;
};

export type Response = Item[];
