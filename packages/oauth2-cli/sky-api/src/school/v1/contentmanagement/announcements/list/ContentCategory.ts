import { DateTimeString } from '@battis/descriptive-types';

export type ContentCategory = {
  id?: number;
  name?: string;
  type?: string;
  primary?: boolean;
  publish_date?: DateTimeString;
  expire_date?: DateTimeString;
};
