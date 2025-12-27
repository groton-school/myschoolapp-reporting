import { Audio } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { format: 'json'; albumId: number };
export type Response = Audio.Album_EditResponse;

export const path = '/api/audio/edit';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
