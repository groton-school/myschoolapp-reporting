import {
  Edit as E,
  ProviderList as Providers
} from 'datadirect/dist/api/LtiTool.js';
import { Fetchable } from '../PuppeteerSession.js';

export const ProviderList: Fetchable.Binding<
  Providers.Payload,
  Providers.Response
> = Fetchable.bind(Providers);

export const Edit: Fetchable.Binding<E.Payload, E.Response> = Fetchable.bind(E);

// TODO Edit.Delete is not fetched
