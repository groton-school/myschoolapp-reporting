import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  DefaultAdminSettingsGet as DefaultAdminSettings,
  hydrategradebook as Gradebook
} from 'datadirect/dist/api/gradebook.js';

export const hydrategradebook: PuppeteerSession.Fetchable.Binding<
  Gradebook.Payload,
  Gradebook.Response
> = PuppeteerSession.Fetchable.bind(Gradebook);

export const DefaultAdminSettingsGet: PuppeteerSession.Fetchable.Binding<
  DefaultAdminSettings.Payload,
  DefaultAdminSettings.Response
> = PuppeteerSession.Fetchable.bind(DefaultAdminSettings);
