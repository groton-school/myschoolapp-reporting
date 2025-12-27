import { NumericTimestamp } from '@battis/descriptive-types';
import { WebApp } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { _?: NumericTimestamp };
export type Response = WebApp.Context;

export const path = '/api/webapp/context';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
