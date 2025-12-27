import { DateString } from '@battis/descriptive-types';
import { Inbox } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {
  format: 'json';
  pageNumber: number;
  /** URL-encoded MM/DD/YYYY */
  toDate: DateString;
};
export type Response = Inbox.Conversation[];

export const pageSize = 20;
export const path = '/api/message/inbox';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path, pageSize });
