import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  ViewAssignmentOptions as AssignmentOptions,
  TypesForSectionSpa as TypesForSection
} from 'datadirect/dist/api/assignment/index.js';

export const TypesForSectionSpa: PuppeteerSession.Fetchable.Binding<
  TypesForSection.Payload,
  TypesForSection.Response
> = PuppeteerSession.Fetchable.bind(TypesForSection);

export const ViewAssignmentOptions: PuppeteerSession.Fetchable.Binding<
  AssignmentOptions.Payload,
  AssignmentOptions.Response
> = PuppeteerSession.Fetchable.bind(AssignmentOptions);
