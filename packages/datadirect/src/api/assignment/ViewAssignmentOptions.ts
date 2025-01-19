import * as Endpoint from '../../Endpoint.js';
import { Payload } from './ViewAssignmentOptions/Payload.js';

export * from './ViewAssignmentOptions/Payload.js';
export * from './ViewAssignmentOptions/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/assigment/ViewAssignmentOptions'
  });
