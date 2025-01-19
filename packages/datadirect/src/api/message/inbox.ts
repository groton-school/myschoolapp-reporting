import * as Endpoint from '../../Endpoint.js';
import { Payload } from './inbox/Payload.js';

export * from './inbox/Payload.js';
export * from './inbox/Response.js';

export const pageSize = 20;

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/message/inbox', pageSize });
