import { PuppeteerSession } from '@msar/puppeteer-session';
import { Categories } from 'datadirect/dist/Endpoints/API/PhotoCategory/index.js';

export const Photocategory: PuppeteerSession.Fetchable.Binding<
  Categories.Payload,
  Categories.Response
> = PuppeteerSession.Fetchable.bind(Categories);
