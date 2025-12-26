import { PuppeteerSession } from '@msar/puppeteer-session';
import { Video } from 'datadirect/dist/api/index.js';

export const List: PuppeteerSession.Fetchable.Binding<
  Video.List.Payload,
  Video.List.Response
> = PuppeteerSession.Fetchable.bind(Video.List);
