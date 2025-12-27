import { NumericString } from '@battis/descriptive-types';

// from Courses.TeacherCoursesGet
export type Course = {
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
