import {
  DateTimeString,
  NumericBoolean,
  NumericTimestamp
} from '@battis/descriptive-types';

export type Topic = {
  TopicIndexId: number;
  TopicId: number;
  ContextLabelId: number;
  SectionId: number;
  PublishDateTicks: NumericTimestamp;
  PublishDate: DateTimeString;
  ExpireDate: DateTimeString | null;
  Primary: boolean;
  Name: string;
  Description: string | null;
  ThumbFilename: string | null;
  TopicGroup: string;
  GroupName: string;
  DiscussionThread: boolean;
  SchoolYear: string;
  /**
   * Layouts
   *
   * ```txt
   *         ___________
   *     0: |       |   | 2-col (wide left)
   *        |_______|___|
   *         ___________
   *     1: |   |       | 2-col (wide right)
   *        |___|_______|
   *         ___________
   *     2: |___________| header 2-col (wide left)
   *        |_______|___|
   *         ___________
   *     3: |___________| header 2-col (wide right)
   *        |___|_______|
   *         ___________
   *     4: |     |     | 2-col even
   *        |_____|_____|
   *         ___________
   *     5: |   |   |   | 3-col even
   *        |___|___|___|
   * ```
   */
  LayoutId: number;
  AllowCopy: boolean;
  AllowEdit: boolean;
  ShareWarningInd: NumericBoolean;
  CreatedByUser: string;
  LockedInd: NumericBoolean;
  ViewerIsOwnerInd: NumericBoolean;
  ViewerIsManagerInd: NumericBoolean;
  EditorOfContent: string;
  ViewerIsContentEditor: NumericBoolean;
};

export type Topic_Section = Omit<
  Topic,
  | 'TopicId'
  | 'SectionId'
  | 'Primary'
  | 'TopicGroup'
  | 'GroupName'
  | 'DiscussionThread'
  | 'SchoolYear'
  | 'LayoutId'
  | 'ShareWarningInd'
  | 'CreatedByUser'
  | 'LockedInd'
  | 'ViewerIsOwnerInd'
  | 'ViewerIsManagerInd'
  | 'EditorOfContent'
  | 'ViewerIsContentEditor'
> & {
  TopicID: number;
  TopicIndexID: number;
};
