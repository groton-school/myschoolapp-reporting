import { Competencies } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {};
export type Response = Competencies.Setup;

export const path = '/api/Competency/CompetencySetup';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
