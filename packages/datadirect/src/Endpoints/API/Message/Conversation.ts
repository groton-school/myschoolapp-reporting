import { Inbox } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { markAsRead: boolean; format: 'json' };
export type Response = Inbox.Conversation;
export type PathParams = { ConversationId: number };

export const pageSize = 20;
export const path = '/api/message/conversation/:ConversationId';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
