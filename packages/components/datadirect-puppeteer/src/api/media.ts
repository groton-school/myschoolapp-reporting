import { PuppeteerSession } from '@msar/puppeteer-session';
import { api } from 'datadirect';

export const AlbumFilesGet = PuppeteerSession.Fetchable.bind<
  api.media.AlbumFilesGet.Payload,
  api.media.AlbumFilesGet.Response
>(api.media.AlbumFilesGet);
