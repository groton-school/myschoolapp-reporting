import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  Setup,
  SkillAssignment
} from 'datadirect/dist/Endpoints/API/Competency/index.js';

export const competencySetup: PuppeteerSession.Fetchable.Binding<
  Setup.Payload,
  Setup.Response
> = PuppeteerSession.Fetchable.bind(Setup);

export const competencySkillAssignmentGet: PuppeteerSession.Fetchable.Binding<
  SkillAssignment.Payload,
  SkillAssignment.Response
> = PuppeteerSession.Fetchable.bind(SkillAssignment);
