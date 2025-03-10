import * as Endpoint from '../../Endpoint.js';
import { Payload } from './topicget/Payload.js';

export * from './topicget/Payload.js';
export * from './topicget/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/DataDirect/topicget/:TopicID'
  });
