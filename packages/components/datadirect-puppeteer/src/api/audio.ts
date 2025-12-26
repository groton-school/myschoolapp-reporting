import { PuppeteerSession } from '@msar/puppeteer-session';
import { audio } from 'datadirect/dist/api/index.js';

export const edit: PuppeteerSession.Fetchable.Binding<
  audio.edit.Payload,
  audio.edit.Response
> = PuppeteerSession.Fetchable.bind(audio.edit);

export const List: PuppeteerSession.Fetchable.Binding<
  audio.List.Payload,
  audio.List.Response
> = PuppeteerSession.Fetchable.bind(audio.List);
