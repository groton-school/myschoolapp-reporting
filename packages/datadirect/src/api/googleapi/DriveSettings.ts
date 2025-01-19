import * as Endpoint from '../../Endpoint.js';
import { Payload } from './DriveSettings/Payload.js';

export * from './DriveSettings/Payload.js';
export * from './DriveSettings/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/googleapi/DriveSettings' });
