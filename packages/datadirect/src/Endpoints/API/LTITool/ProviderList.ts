import { LTITools } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { scope: number };
export type Response = LTITools.LTITool[];

export const path = '/api/LtiTool/ProviderList';

/** List available Learning Tools */
export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
