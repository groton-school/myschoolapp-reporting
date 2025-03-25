import { PuppeteerSession } from '@msar/puppeteer-session';
import { api } from 'datadirect';

export const List: PuppeteerSession.Fetchable.Binding<
  api.Rubric.List.Payload,
  api.Rubric.List.Response
> = PuppeteerSession.Fetchable.bind(api.Rubric.List);

export const AssignmentRubric: PuppeteerSession.Fetchable.Binding<
  api.Rubric.AssignmentRubric.Payload,
  api.Rubric.AssignmentRubric.Response
> = PuppeteerSession.Fetchable.bind(api.Rubric.AssignmentRubric);
