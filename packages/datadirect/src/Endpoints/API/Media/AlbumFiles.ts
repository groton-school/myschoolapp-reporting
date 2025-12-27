import { Media } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { format: 'json'; albumId: number; logView: boolean };
export type Response = Media.Media[];

export const path = '/api/media/AlbumFilesGet/';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
