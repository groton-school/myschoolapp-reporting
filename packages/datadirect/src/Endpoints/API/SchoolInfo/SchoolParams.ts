import { Schools } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { all?: boolean };
export type Response = Schools.SchoolParameters;

export const path = '/api/schoolinfo/schoolparams';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
