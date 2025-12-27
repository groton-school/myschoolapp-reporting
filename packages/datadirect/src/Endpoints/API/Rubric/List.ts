import { JSONValue } from '@battis/typescript-tricks';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {};
export type Response = JSONValue[]; // TODO Rubric/List.Response type

export const path = '/api/Rubric/List';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
