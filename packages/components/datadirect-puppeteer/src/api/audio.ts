import { PuppeteerSession } from '@msar/puppeteer-session';
import { Edit, List } from 'datadirect/dist/Endpoints/API/Audio/index.js';

export const edit: PuppeteerSession.Fetchable.Binding<
  Edit.Payload,
  Edit.Response
> = PuppeteerSession.Fetchable.bind(Edit);

export const list: PuppeteerSession.Fetchable.Binding<
  List.Payload,
  List.Response
> = PuppeteerSession.Fetchable.bind(List);
