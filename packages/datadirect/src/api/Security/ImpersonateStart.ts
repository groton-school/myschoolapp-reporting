import * as Endpoint from '../../Endpoint.js';
import { Payload } from './ImpersonateStart/Payload.js';

/*
 * TODO Handle endpoints that do not return responses
 *   Another piquant flavor for #178 and #61
 */

export * from './ImpersonateStart/Payload.js';
// There is no returned response from this call

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: 'api/Security/ImpersonateStart/:ImpUserId/?format=json',
    method: 'POST'
  });
