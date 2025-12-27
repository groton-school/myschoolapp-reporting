import { Rubrics } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { id: number };
export type Response = Rubrics.Rubric;

export const path = '/api/Rubric/AssignmentRubric';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
