import {
  DefaultAdminSettingsGet as DefaultAdminSettings,
  hydrategradebook as Gradebook
} from 'datadirect/dist/api/gradebook.js';
import { Fetchable } from '../PuppeteerSession.js';

export const hydrategradebook: Fetchable.Binding<
  Gradebook.Payload,
  Gradebook.Response
> = Fetchable.bind(Gradebook);

export const DefaultAdminSettingsGet: Fetchable.Binding<
  DefaultAdminSettings.Payload,
  DefaultAdminSettings.Response
> = Fetchable.bind(DefaultAdminSettings);
