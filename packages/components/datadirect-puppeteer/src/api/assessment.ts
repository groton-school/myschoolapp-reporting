import { PuppeteerSession } from '@msar/puppeteer-session';
import { AssessmentGetSpa as AssessmentSPA } from 'datadirect/dist/api/assessment/index.js';

export const AssessmentGetSpa: PuppeteerSession.Fetchable.Binding<
  AssessmentSPA.Payload,
  AssessmentSPA.Response
> = PuppeteerSession.Fetchable.bind(AssessmentSPA);
