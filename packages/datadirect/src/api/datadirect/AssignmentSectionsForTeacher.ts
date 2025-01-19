import * as Endpoint from '../../Endpoint.js';
import { Payload } from './AssignmentSectionsForTeacher/Payload.js';

export * from './AssignmentSectionsForTeacher/Payload.js';
export * from './AssignmentSectionsForTeacher/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/datadirect/AssignmentSectionsForTeacher'
  });
