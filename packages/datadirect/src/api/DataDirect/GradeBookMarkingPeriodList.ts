import * as Endpoint from '../Endpoint.js';
import { Payload } from './GradeBookMarkingPeriodList/Payload.js';

export * from './GradeBookMarkingPeriodList/Payload.js';
export * from './GradeBookMarkingPeriodList/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: '/api/datadirect/GradeBookMarkingPeriodList'
  });
