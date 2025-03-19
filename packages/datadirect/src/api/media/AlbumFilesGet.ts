import * as Endpoint from '../../Endpoint.js';
import { Payload } from './AlbumFilesGet/Payload.js';

export * from './AlbumFilesGet/Payload.js';
export * from './AlbumFilesGet/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path: '/api/media/AlbumFilesGet/' });
