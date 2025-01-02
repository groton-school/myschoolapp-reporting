import * as Endpoint from '../../Endpoint.js';
import { Payload } from './BulletinBoardContentGet/Payload.js';

export { prepareContent } from './common.js';

export * from './BulletinBoardContentGet/Payload.js';
export * from './BulletinBoardContentGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/datadirect/BulletinBoardContentGet'
  });
