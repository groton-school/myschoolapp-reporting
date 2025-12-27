import { DateTimeString, HTMLString } from '@battis/descriptive-types';

// TODO DataDirect/common/ContentItem/Expectations identical to Syllabus, GradingRubric
export type Syllabus = {
  Id: number;
  SectionId: number;
  Description: HTMLString;
  ShortDescription: string;
  ExpireDate: DateTimeString;
  PublishDate: DateTimeString;
  Attachment: string;
};

export type Content = Syllabus[];
