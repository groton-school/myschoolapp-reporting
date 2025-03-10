import {
  DateTimeString,
  NumericBoolean,
  NumericTimestamp
} from '@battis/descriptive-types';

export type Item = {
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

export type Response = Item[];
