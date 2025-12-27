import { Assessments } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { assessmentId: number };
export type Response = Assessments.Assessment;

export const path = '/api/assessment/AssessmentGetSpa';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
