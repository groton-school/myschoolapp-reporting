import { Gradebook } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { sectionId: number; markingPeriodId: number };
export type Response = Gradebook.Gradebook;

export const path = '/api/gradebook/hydrategradebook';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
