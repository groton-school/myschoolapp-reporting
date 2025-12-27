import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  Delete,
  Edit,
  ProviderList
} from 'datadirect/dist/Endpoints/API/LTITool/index.js';

export const providerList: PuppeteerSession.Fetchable.Binding<
  ProviderList.Payload,
  ProviderList.Response
> = PuppeteerSession.Fetchable.bind(ProviderList);

export const edit: PuppeteerSession.Fetchable.Binding<
  Edit.Payload,
  Edit.Response
> = PuppeteerSession.Fetchable.bind(Edit);

export const deleteProvider: PuppeteerSession.Fetchable.Binding<
  Delete.Payload,
  Delete.Response
> = PuppeteerSession.Fetchable.bind(Delete);
