import * as Endpoint from '../../../Endpoint.js';
import { Payload } from './Payload.js';

export * from './Payload.js';
export * from './Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) => {
  return Endpoint.prepare({
    payload,
    base,
    path: `/api/datadirect/sectiontopicsget/:Id`
  });
};
