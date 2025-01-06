import { DateString } from '@battis/descriptive-types';

export type Payload = {
  format: 'json';
  pageNumber: number;
  /** URL-encoded MM/DD/YYYY */
  toDate: DateString;
};
