import * as Endpoint from '../../Endpoint.js';
import { Payload } from './TeacherCoursesGet/Payload.js';

export * from './TeacherCoursesGet/Payload.js';
export * from './TeacherCoursesGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/Courses/TeacherCoursesGet'
  });
