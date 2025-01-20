import * as Endpoint from '../../Endpoint.js';
import { Payload } from './conversation/Payload.js';

export * from './conversation/Payload.js';
export * from './conversation/Response.js';

export const pageSize = 20;

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/message/conversation/:ConversationId'
  });
