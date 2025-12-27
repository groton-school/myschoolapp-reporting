import { LTITools } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = LTITools.Settings;
export type Response = number;

export const path = '/api/LtiTool/Edit';
export const method = 'POST';

/** Add a Learning Tool widget to a topic */
export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path,
    method
  });
