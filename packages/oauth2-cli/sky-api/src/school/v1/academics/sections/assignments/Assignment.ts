import { DateTimeString } from '@battis/descriptive-types';
import { IdDescriptorField } from './IdDescriptorField.js';

export type Assignment = {
  id?: number;
  date?: DateTimeString<'ISO'>;
  description?: string;
  discussion?: boolean;
  due_date?: DateTimeString<'ISO'>;
  enrolled?: number;
  graded_count?: number;
  index_id?: number;
  major?: boolean;
  name?: string;
  publish_on_assigned?: boolean;
  published?: boolean;
  rank?: number;
  status?: 0 | 1 | 2 | -1;
  type?: string;
  type_id?: number;
  rubric: IdDescriptorField;
};
