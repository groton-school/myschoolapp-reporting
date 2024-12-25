import * as Endpoint from '../Endpoint.js';
import { Payload } from './UserAssignmentDetailsGetAllData/Payload.js';

export * from './UserAssignmentDetailsGetAllData/Payload.js';
export * from './UserAssignmentDetailsGetAllData/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/assignment2/UserAssignmentDetailsGetAllData'
  });
