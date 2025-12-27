import { Assignments } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { sectionId: number };
export type Response = Assignments.AssignmentType[];

export const path = '/api/assigment/TypesForSectionSpa';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
