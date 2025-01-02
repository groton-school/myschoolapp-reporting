import * as Endpoint from '../../Endpoint.js';
import { Payload } from './ImportAssignmentsGet/Payload.js';

export * from './ImportAssignmentsGet/Payload.js';
export * from './ImportAssignmentsGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/DataDirect/ImportAssignmentsGet'
  });
