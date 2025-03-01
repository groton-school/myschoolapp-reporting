import { PuppeteerSession } from '@msar/puppeteer-session';
import { List as L } from 'datadirect/dist/api/Rubric.js';

export const List: PuppeteerSession.Fetchable.Binding<L.Payload, L.Response> =
  PuppeteerSession.Fetchable.bind(L);
