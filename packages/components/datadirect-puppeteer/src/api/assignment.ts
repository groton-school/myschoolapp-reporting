import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  TypesForSection,
  ViewOptions
} from 'datadirect/dist/Endpoints/API/Assignment/index.js';

export const typesForSection: PuppeteerSession.Fetchable.Binding<
  TypesForSection.Payload,
  TypesForSection.Response
> = PuppeteerSession.Fetchable.bind(TypesForSection);

export const viewOptions: PuppeteerSession.Fetchable.Binding<
  ViewOptions.Payload,
  ViewOptions.Response
> = PuppeteerSession.Fetchable.bind(ViewOptions);
