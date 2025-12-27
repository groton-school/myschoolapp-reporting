import { Integrations } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {};
export type Response = Integrations.GoogleAPI.DriveSettings;

export const path = '/api/googleapi/DriveSettings';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
