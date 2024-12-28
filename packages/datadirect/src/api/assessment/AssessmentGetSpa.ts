import * as Endpoint from '../../Endpoint.js';
import { Payload } from './AssessmentGetSpa.js';

export * from './AssessmentGetSpa/Payload.js';
export * from './AssessmentGetSpa/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/assessment/AssessmentGetSpa'
  });
