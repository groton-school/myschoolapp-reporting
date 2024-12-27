import * as Endpoint from '../Endpoint.js';
import { Payload } from './topicassignmentsget/Payload.js';

export * from './topicassignmentsget/Payload.js';
export * from './topicassignmentsget/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/topic/topicassignmentsget' });
