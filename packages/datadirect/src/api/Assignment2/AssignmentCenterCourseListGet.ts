import * as Endpoint from '../../Endpoint.js';
import { Payload } from './AssignmentCenterCourseListGet/Payload.js';

export * from './AssignmentCenterCourseListGet/Payload.js';
export * from './AssignmentCenterCourseListGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/Assignment2/AssignmentCenterCourseListGet',
    method: 'POST'
  });
