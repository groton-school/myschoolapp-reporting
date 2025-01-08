import * as Endpoint from '../../Endpoint.js';
import { Payload } from './context/Payload.js';

export * from './context/Payload.js';
export * from './context/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/webapp/context' });
