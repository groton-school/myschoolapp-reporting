import * as Endpoint from '../../Endpoint.js';
import { Payload } from './ImpersonateStart/Payload.js';

export * from './schoolparams/Payload.js';
// There is no returned response from this call

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: 'api/Security/ImpersonateStart/:ImpUserId/?format=json',
    method: 'POST'
  });
