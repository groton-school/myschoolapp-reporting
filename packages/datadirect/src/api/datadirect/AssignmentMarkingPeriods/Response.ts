import { DateTimeString, NumericTimestamp } from '@battis/descriptive-types';

export type Item = {
  section_id: number;
  duration_id: number;
  this_duration: string;
  duration_description: string;
  duration_begin_dateTicks: NumericTimestamp;
  /** n/j/Y g:i A */
  duration_begin_date: DateTimeString;
  duration_end_dateTicks: NumericTimestamp;
  /** n/j/Y g:i A */
  duration_end_date: DateTimeString;
  marking_period_id: number;
  marking_period_description: string;
  begin_dateTicks: NumericTimestamp;
  /** n/j/Y g:i A */
  begin_date: DateTimeString;
  end_dateTicks: NumericTimestamp;
  /** n/j/Y g:i A */
  end_date: DateTimeString;
};

export type Response = Item[];
