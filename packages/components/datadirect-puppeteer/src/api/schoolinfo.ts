import { PuppeteerSession } from '@msar/puppeteer-session';
import { schoolparams as S } from 'datadirect/dist/api/schoolinfo.js';

export const schoolparams: PuppeteerSession.Fetchable.Binding<
  S.Payload,
  S.Response
> = PuppeteerSession.Fetchable.bind(S);
