import { PuppeteerSession } from '@msar/puppeteer-session';
import { AudioCategory as C } from 'datadirect/dist/api/index.js';

export const categories: PuppeteerSession.Fetchable.Binding<
  C.Payload,
  C.Response
> = PuppeteerSession.Fetchable.bind(C);

export const edit: PuppeteerSession.Fetchable.Binding<
  C.edit.Payload,
  C.edit.Response
> = PuppeteerSession.Fetchable.bind(C.edit);
