import * as Endpoint from '../../Endpoint.js';

export type Payload = {};
export type Response = { WasVoid: boolean };
export type PathParams = { ContentItemId: number };

export const path = '/api/LtiTool/Edit/:ContentItemId';
export const method = 'DELETE';

export const prepare: Endpoint.Prepare<Payload> = (_ = {}, base?: string) =>
  Endpoint.prepare({
    payload: {},
    base,
    path,
    method
  });
