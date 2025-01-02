import * as Endpoint from '../../Endpoint.js';
import { Payload } from './sectiontopicsget/Payload.js';

export * from './sectiontopicsget/Payload.js';
export * from './sectiontopicsget/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) => {
  return Endpoint.prepare({
    payload,
    base,
    path: `/api/datadirect/sectiontopicsget/:Id`
  });
};
