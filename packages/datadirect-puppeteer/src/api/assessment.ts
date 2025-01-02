import { AssessmentGetSpa as AssessmentSPA } from 'datadirect/dist/api/assessment.js';
import { Fetchable } from '../PuppeteerSession.js';

export const AssessmentGetSpa: Fetchable.Binding<
  AssessmentSPA.Payload,
  AssessmentSPA.Response
> = Fetchable.bind(AssessmentSPA);
