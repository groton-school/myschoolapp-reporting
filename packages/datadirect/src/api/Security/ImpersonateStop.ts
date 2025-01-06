import * as Endpoint from '../../Endpoint.js';
import { Payload } from './ImpersonateStop/Payload.js';

export * from './ImpersonateStop/Payload.js';
// There is no returned response from this call

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: 'api/Security/ImpersonateStop'
  });
