import * as Endpoint from '../../Endpoint.js';
import { Payload } from './AssignmentMarkingPeriods/Payload.js';

export * from './AssignmentMarkingPeriods/Payload.js';
export * from './AssignmentMarkingPeriods/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/datadirect/AssignmentMarkingPeriods'
  });
