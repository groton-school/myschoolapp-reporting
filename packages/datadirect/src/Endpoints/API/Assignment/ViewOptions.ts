import { Assignments } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {};
export type Response = Assignments.Options;

export const path = '/api/assigment/ViewAssignmentOptions';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
