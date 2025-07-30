import * as Endpoint from '../../../Endpoint.js';

export * from './Response.js';

// TODO need to define a better schema for multiple methods tot he same endpoint
export const prepare: Endpoint.Prepare<{}> = (_ = {}, base?: string) =>
  Endpoint.prepare({
    payload: {},
    base,
    path: '/api/LtiTool/Edit/:ContentItemId',
    method: 'DELETE'
  });
