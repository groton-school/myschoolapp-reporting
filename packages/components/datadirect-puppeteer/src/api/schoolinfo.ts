import { PuppeteerSession } from '@msar/puppeteer-session';
import { SchoolParams } from 'datadirect/dist/Endpoints/API/SchoolInfo/index.js';

export const schoolParams: PuppeteerSession.Fetchable.Binding<
  SchoolParams.Payload,
  SchoolParams.Response
> = PuppeteerSession.Fetchable.bind(SchoolParams);
