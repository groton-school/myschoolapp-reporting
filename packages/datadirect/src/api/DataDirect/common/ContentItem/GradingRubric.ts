import { DateTimeString, URLString } from '@battis/descriptive-types';

// TODO DataDirect/common/ContentItem/Expectations identical to Syllabus, GradingRubric
export type GradingRubric = {
  Id: number;
  SectionId: number;
  Description: URLString;
  ShortDescription: string;
  ExpireDate: DateTimeString;
  PublishDate: DateTimeString;
  Attachment: string;
};

export type Content = GradingRubric[];
