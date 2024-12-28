import * as Endpoint from '../../Endpoint.js';
import { Payload } from './ProviderList/Payload.js';

export * from './ProviderList/Payload.js';
export * from './ProviderList/Response.js';

/** List available Learning Tools */
export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/LtiTool/ProviderList' });
