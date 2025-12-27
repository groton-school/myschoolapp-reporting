import { Gradebook } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { sectionId: number };
export type Response = Gradebook.DefaultAdminSettings;

export const path = '/api/gradebook/DefaultAdminSettingsGet';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
