import { PuppeteerSession } from '@msar/puppeteer-session';
import { Get } from 'datadirect/dist/Endpoints/API/Assessment/index.js';

export const get: PuppeteerSession.Fetchable.Binding<
  Get.Payload,
  Get.Response
> = PuppeteerSession.Fetchable.bind(Get);
