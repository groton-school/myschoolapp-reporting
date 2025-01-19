import * as Endpoint from '../../Endpoint.js';
import { Payload } from './crud/Payload.js';

export * from './crud/Payload.js';
export * from './crud/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/Assignment2/crud',
    method: 'PUT'
  });
