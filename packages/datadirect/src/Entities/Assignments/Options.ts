import { DateString, TimeString } from '@battis/descriptive-types';

export type Options = {
  /** H:i:s */
  DefaultTime: TimeString;
  AssignmentCenterView: number;
  AssignmentCenterRange: number;
  AssignmentCenterDisplay: number;
  AssignmentCenterDefaultDueFilter: number;
  AssignmentCenterDefaultPublishStatusFilter: number;
  AssignmentCenterDefaultSortFilter: number;
  FilterDateFrom: DateString | null;
  FilterDateTo: DateString | null;
  SectionDefaultDueFilter: number;
  SectionDefaultPublishStatusFilter: number;
  SectionDefaultSortFilter: number;
  SectionFilterDateFrom: DateString | null;
  SectionFilterDateTo: DateString | null;
  StudentAssignmentCenterView: number;
  StudentAssignmentCenterRange: number;
  /** H:i:s */
  DefaultDueTime: TimeString;
  StudentAssignmentCenterStatusBehavior: number;
};
