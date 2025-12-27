import { Audio, ContentFilter } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = ContentFilter;
export type Response = Audio.Album[];
export type PathParams = { AudioCategoryId: number };

export const path = '/api/audio/List/:AudioCategoryId';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
