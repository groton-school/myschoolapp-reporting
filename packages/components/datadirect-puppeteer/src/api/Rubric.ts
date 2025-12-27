import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  AssignmentRubric,
  List
} from 'datadirect/dist/Endpoints/API/Rubric/index.js';

export const list: PuppeteerSession.Fetchable.Binding<
  List.Payload,
  List.Response
> = PuppeteerSession.Fetchable.bind(List);

export const assignmentRubric: PuppeteerSession.Fetchable.Binding<
  AssignmentRubric.Payload,
  AssignmentRubric.Response
> = PuppeteerSession.Fetchable.bind(AssignmentRubric);
