import { Videos } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {
  rowsPerPage: number;
  pageNumber: number;
};
export type Response = Videos.Category[];

export const path = '/api/VideoCategory';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
