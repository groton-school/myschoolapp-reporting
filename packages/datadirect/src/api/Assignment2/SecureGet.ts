import * as Endpoint from '../../Endpoint.js';
import { Payload } from './SecureGet/Payload.js';

export * from './SecureGet/Payload.js';
export * from './SecureGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/Assignment2/SecureGet'
  });
