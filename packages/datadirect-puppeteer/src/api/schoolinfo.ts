import { schoolparams as S } from 'datadirect/dist/api/schoolinfo.js';
import { fetchViaPuppeteer } from './fetchViaPuppeteer.js';

export const schoolparams = fetchViaPuppeteer<S.Payload, S.Response>(S);
