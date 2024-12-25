import * as Endpoint from '../Endpoint.js';
import { Payload } from './SectionInfoView/Payload.js';

export * from './SectionInfoView/Payload.js';
export * from './SectionInfoView/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/datadirect/SectionInfoView' });
