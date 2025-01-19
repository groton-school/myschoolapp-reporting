import * as Endpoint from '../../Endpoint.js';
import { Payload } from './List/Payload.js';

export * from './List/Payload.js';
export * from './List/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/Rubric/List' });
