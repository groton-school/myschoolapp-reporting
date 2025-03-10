import {
  DateString,
  NumericBoolean,
  NumericTimestamp
} from '@battis/descriptive-types';

export type Item = {
  AllowCopy: boolean;
  AllowEdit: boolean;
  ContextLabelId: number;
  CreatedByUser: string;
  Description?: string | null;
  DiscussionThread: boolean;
  EditorOfContent: string;
  ExpireDate?: DateString | null;
  GroupName: string;
  LayoutId: number;
  LockedInd: number;
  Name: string;
  Primary: boolean;
  PublishDate: DateString;
  PublishDateTicks: NumericTimestamp;
  SchoolYear: string;
  SectionId: number;
  ShareWarningInd: NumericBoolean;
  ThumbFilename?: string | null;
  TopicGroup: string;
  TopicID: number;
  TopicIndexID: number;
  ViewerIsContentEditor: NumericBoolean;
  ViewerIsManagerInd: NumericBoolean;
  ViewerIsOwnerInd: NumericBoolean;
};

export type Response = Item[];
