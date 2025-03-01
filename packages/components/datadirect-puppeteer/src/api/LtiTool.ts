import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  Edit as E,
  ProviderList as Providers
} from 'datadirect/dist/api/LtiTool.js';

export const ProviderList: PuppeteerSession.Fetchable.Binding<
  Providers.Payload,
  Providers.Response
> = PuppeteerSession.Fetchable.bind(Providers);

export const Edit: PuppeteerSession.Fetchable.Binding<E.Payload, E.Response> =
  PuppeteerSession.Fetchable.bind(E);

// TODO Edit.Delete is not fetched
