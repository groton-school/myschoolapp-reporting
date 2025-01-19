import * as Endpoint from '../../Endpoint.js';
import { Payload } from './DefaultAdminSettingsGet/Payload.js';

export * from './DefaultAdminSettingsGet/Payload.js';
export * from './DefaultAdminSettingsGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/gradebook/DefaultAdminSettingsGet'
  });
