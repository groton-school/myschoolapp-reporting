import { PuppeteerSession } from '@msar/puppeteer-session';
import { List } from 'datadirect/dist/Endpoints/API/Photo/index.js';

export const list: PuppeteerSession.Fetchable.Binding<
  List.Payload,
  List.Response
> = PuppeteerSession.Fetchable.bind(List);
