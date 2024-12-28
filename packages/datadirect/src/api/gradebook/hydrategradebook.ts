import * as Endpoint from '../../Endpoint.js';
import { Payload } from './hydrategradebook/Payload.js';

export * from './hydrategradebook/Payload.js';
export * from './hydrategradebook/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/gradebook/hydrategradebook' });
