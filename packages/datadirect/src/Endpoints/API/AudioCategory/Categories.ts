import { Audio } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {
  rowsPerPage: number;
  pageNumber: number;
};
export type Response = Audio.Category[];

export const path = '/api/AudioCategory';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
