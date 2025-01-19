import { DriveSettings as D } from 'datadirect/dist/api/googleapi.js';
import { Fetchable } from '../PuppeteerSession.js';

export const DriveSettings: Fetchable.Binding<D.Payload, D.Response> =
  Fetchable.bind(D);
