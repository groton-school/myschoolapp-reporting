import { PuppeteerSession } from '@msar/puppeteer-session';
import { Photocategory as C } from 'datadirect/dist/api/index.js';

export const Photocategory: PuppeteerSession.Fetchable.Binding<
  C.Payload,
  C.Response
> = PuppeteerSession.Fetchable.bind(C);
