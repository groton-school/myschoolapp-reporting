import * as Endpoint from '../../../Endpoint.js';
import { Payload } from './Payload.js';

export * from './Payload.js';
export * from './Response.js';

/** List available Learning Tools */
export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/LtiTool/ProviderList' });
