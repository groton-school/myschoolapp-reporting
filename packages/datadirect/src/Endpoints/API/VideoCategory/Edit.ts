import { Videos } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {};
export type Response = Videos.Cateogry_EditResponse;
export type PathParams = { VideoCategoryId: number };

export const path = '/api/videocategory/edit/:VideoCategoryId';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
