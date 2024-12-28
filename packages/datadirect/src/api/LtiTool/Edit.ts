import * as Endpoint from '../../Endpoint.js';
import { Payload } from './Edit/Payload.js';

export * from './Edit/Payload.js';
export * from './Edit/Response.js';

/** Add a Learning Tool widget to a topic */
export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/LtiTool/Edit',
    method: 'POST'
  });
