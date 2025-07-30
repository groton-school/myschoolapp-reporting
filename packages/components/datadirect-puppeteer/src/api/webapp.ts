import { PuppeteerSession } from '@msar/puppeteer-session';
import { context as Context } from 'datadirect/dist/api/webapp/index.js';

export const context: PuppeteerSession.Fetchable.Binding<
  Context.Payload,
  Context.Response
> = PuppeteerSession.Fetchable.bind(Context);
