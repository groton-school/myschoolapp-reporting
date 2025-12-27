import { DateTimeString } from '@battis/descriptive-types';

export type Group = {
  GroupName: string;
  CourseTitle: string;
  ContextLabelId: number;
  ContextValue: number;
  Id: string;
  Name: string;
  ExpireDate: DateTimeString | null;
  PublishDate: DateTimeString;
  Primary: boolean;
  ContextLabel: number;
  SchoolYear: string;
  albumId: number;
  IsPublicCategory: number;
};
