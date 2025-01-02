import * as Endpoint from '../../Endpoint.js';
import { Payload } from './groupFinderByYear/Payload.js';

export * from './groupFinderByYear/Payload.js';
export * from './groupFinderByYear/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/dataDirect/groupFinderByYear'
  });
