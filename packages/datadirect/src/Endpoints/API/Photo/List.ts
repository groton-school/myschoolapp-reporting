import { ContentFilter, Photos } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = ContentFilter;
export type Response = Photos.Photo[];

export const path = '/api/Photo/List';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
