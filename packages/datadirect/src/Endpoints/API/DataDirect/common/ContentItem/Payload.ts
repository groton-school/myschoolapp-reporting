import { DateString } from '@battis/descriptive-types';

export type Payload = {
  id?: number; // Assignment
  leadSectionId?: number; // Assignment
  format: 'json';
  contextLabelId?: number;
  contentId?: number; // Media
  contentIndexId?: number; // Discussion Threads
  contextValue?: number; // Widget, RSS Reader
  topicIndexId?: number; // Discussion Threads
  editMode?: string;
  active?: boolean;
  future?: boolean;
  expired?: boolean;
  viewDate?: DateString; // Discussion Threads
  fromDate?: DateString;
  toDate?: DateString;
  row?: number; // Assignment
  column?: number; // Assignment
  cell?: number; // Assignment
  selectedOnly?: boolean; // Assignment
};
