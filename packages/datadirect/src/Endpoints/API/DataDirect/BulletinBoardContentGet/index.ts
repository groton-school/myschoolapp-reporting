import * as Endpoint from '../../../Endpoint.js';
import { Payload } from './Payload.js';

export { prepareContent } from '../common/index.js';

export * from './Payload.js';
export * from './Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/datadirect/BulletinBoardContentGet'
  });
