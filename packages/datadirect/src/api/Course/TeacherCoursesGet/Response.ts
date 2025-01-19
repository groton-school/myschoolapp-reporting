import { NumericString } from '@battis/descriptive-types';

export type Item = {
  LeadSectionId: number;
  SectionId: number;
  CurrentSectionId: number;
  Association: number;
  OfferingId: number;
  IsOwner: boolean;
  UserId: number;
  CourseLength: number;
  LevelId: NumericString;
  PublishGroupToUser: boolean;
  CurrentEnrollment: boolean;
  IsMyGroup: boolean;
  IsMyChildsGroup: boolean;
  IsContentOwner: boolean;
  CourseTitle: string;
};

export type Response = Item[];
