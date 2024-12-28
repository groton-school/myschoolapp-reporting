import * as Endpoint from '../../Endpoint.js';
import { Payload } from './schoolparams/Payload.js';

export * from './schoolparams/Payload.js';
export * from './schoolparams/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/schoolinfo/schoolparams' });
