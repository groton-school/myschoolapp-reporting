import * as Endpoint from '../../Endpoint.js';
import { Payload } from './TopicContentTypesGet/Payload.js';

export * from './TopicContentTypesGet/Payload.js';
export * from './TopicContentTypesGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/DataDirect/TopicContentTypesGet'
  });
