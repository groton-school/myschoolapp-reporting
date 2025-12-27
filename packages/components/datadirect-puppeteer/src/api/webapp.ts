import { PuppeteerSession } from '@msar/puppeteer-session';
import { Context } from 'datadirect/dist/Endpoints/API/WebApp/index.js';

export const context: PuppeteerSession.Fetchable.Binding<
  Context.Payload,
  Context.Response
> = PuppeteerSession.Fetchable.bind(Context);
