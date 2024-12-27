import * as Endpoint from '../Endpoint.js';
import { Payload } from './sectionrosterget/Payload.js';

export * from './sectionrosterget/Payload.js';
export * from './sectionrosterget/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/datadirect/sectionrosterget/:Id'
  });
