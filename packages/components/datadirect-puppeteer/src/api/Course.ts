import { PuppeteerSession } from '@msar/puppeteer-session';
import { TeacherCoursesGet as TeacherCourses } from 'datadirect/dist/api/Course.js';

export const TeacherCoursesGet: PuppeteerSession.Fetchable.Binding<
  TeacherCourses.Payload,
  TeacherCourses.Response
> = PuppeteerSession.Fetchable.bind(TeacherCourses);
