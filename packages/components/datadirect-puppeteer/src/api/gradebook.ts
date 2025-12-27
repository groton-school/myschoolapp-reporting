import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  DefaultAdminSettings,
  HydrateGradebook
} from 'datadirect/dist/Endpoints/API/Gradebook/index.js';

export const hydrateGradebook: PuppeteerSession.Fetchable.Binding<
  HydrateGradebook.Payload,
  HydrateGradebook.Response
> = PuppeteerSession.Fetchable.bind(HydrateGradebook);

export const defaultAdminSettings: PuppeteerSession.Fetchable.Binding<
  DefaultAdminSettings.Payload,
  DefaultAdminSettings.Response
> = PuppeteerSession.Fetchable.bind(DefaultAdminSettings);
