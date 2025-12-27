import { Courses } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { schoolYear: string; levelNum: number };
export type Response = Courses.Course[];

export const path = '/api/Courses/TeacherCoursesGet';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
