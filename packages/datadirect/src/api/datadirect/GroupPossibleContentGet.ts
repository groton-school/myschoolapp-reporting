import * as Endpoint from '../../Endpoint.js';
import { Payload } from './GroupPossibleContentGet/Payload.js';

export * from './GroupPossibleContentGet/Payload.js';
export * from './GroupPossibleContentGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/datadirect/GroupPossibleContentGet'
  });
