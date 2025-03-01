import { PuppeteerSession } from '@msar/puppeteer-session';
import { DriveSettings as D } from 'datadirect/dist/api/googleapi.js';

export const DriveSettings: PuppeteerSession.Fetchable.Binding<
  D.Payload,
  D.Response
> = PuppeteerSession.Fetchable.bind(D);
