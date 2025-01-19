import { TeacherCoursesGet as TeacherCourses } from 'datadirect/dist/api/Course.js';
import { Fetchable } from '../PuppeteerSession.js';

export const TeacherCoursesGet: Fetchable.Binding<
  TeacherCourses.Payload,
  TeacherCourses.Response
> = Fetchable.bind(TeacherCourses);
