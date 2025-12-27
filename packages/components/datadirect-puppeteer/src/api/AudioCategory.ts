import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  Categories,
  Edit
} from 'datadirect/dist/Endpoints/API/AudioCategory/index.js';

export const categories: PuppeteerSession.Fetchable.Binding<
  Categories.Payload,
  Categories.Response
> = PuppeteerSession.Fetchable.bind(Categories);

export const edit: PuppeteerSession.Fetchable.Binding<
  Edit.Payload,
  Edit.Response
> = PuppeteerSession.Fetchable.bind(Edit);
