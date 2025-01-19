import * as Endpoint from '../../Endpoint.js';
import { Payload } from './AssignmentPreference/Payload.js';

export * from './AssignmentPreference/Payload.js';
export * from './AssignmentPreference/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/Assignment2/AssignmentPreference'
  });
