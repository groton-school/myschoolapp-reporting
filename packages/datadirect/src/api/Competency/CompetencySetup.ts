import * as Endpoint from '../../Endpoint.js';
import { Payload } from './CompetencySetup/Payload.js';

export * from './CompetencySetup/Payload.js';
export * from './CompetencySetup/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/Comptency/CompetencySetup'
  });
