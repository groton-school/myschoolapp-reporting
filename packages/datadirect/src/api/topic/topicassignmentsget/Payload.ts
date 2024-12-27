export type Payload = {
  /** TopicId */
  id: number;
  /** Section.Id */
  leadSectionId: number;
  /** -1 for all */
  row: number;
  /** -1 for all */
  column: number;
  /** -1 for all */
  cell: number;
  /** false for all */
  selectedOnly: boolean;
};
