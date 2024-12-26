import {
  Edit as E,
  ProviderList as Providers
} from 'datadirect/dist/api/LtiTool.js';
import { fetchViaPuppeteer } from './fetchViaPuppeteer.js';

export const ProviderList = fetchViaPuppeteer<
  Providers.Payload,
  Providers.Response
>(Providers);

export const Edit = fetchViaPuppeteer<E.Payload, E.Response>(E);

// TODO Edit.Delete is not fetched
