import { ContentFilter } from '../../../Entities/ContentFilter.js';
import { Videos } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = ContentFilter;
export type Response = Videos.Video[];
export type PathParams = { VideoCategoryId: number };

export const path = '/api/Video/List/:VideoCategoryId';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
