import { PuppeteerSession } from '@msar/puppeteer-session';
import { DriveSettings } from 'datadirect/dist/Endpoints/API/GoogleAPI/index.js';

export const driveSettings: PuppeteerSession.Fetchable.Binding<
  DriveSettings.Payload,
  DriveSettings.Response
> = PuppeteerSession.Fetchable.bind(DriveSettings);
