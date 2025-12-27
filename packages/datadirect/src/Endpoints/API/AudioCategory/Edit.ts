import { Audio } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {};
export type Response = Audio.Category_EditResponse;
export type PathParams = { AudioCategoryId: number };

export const path = '/api/audiocategory/edit/:AudioCategoryId';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
