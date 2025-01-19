import * as Endpoint from '../../Endpoint.js';
import { Payload } from './TypesForSectionSpa/Payload.js';

export * from './TypesForSectionSpa/Payload.js';
export * from './TypesForSectionSpa/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/assigment/TypesForSectionSpa'
  });
