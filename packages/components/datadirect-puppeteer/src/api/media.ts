import { PuppeteerSession } from '@msar/puppeteer-session';
import { AlbumFiles } from 'datadirect/dist/Endpoints/API/Media/index.js';

export const albumFiles = PuppeteerSession.Fetchable.bind<
  AlbumFiles.Payload,
  AlbumFiles.Response
>(AlbumFiles);
