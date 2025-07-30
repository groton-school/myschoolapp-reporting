import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  CompetencySetup as Setup,
  CompetencySkillAssignmentGet as Skills
} from 'datadirect/dist/api/Competency/index.js';

export const CompetencySetup: PuppeteerSession.Fetchable.Binding<
  Setup.Payload,
  Setup.Response
> = PuppeteerSession.Fetchable.bind(Setup);

export const CompetencySkillAssignmentGet: PuppeteerSession.Fetchable.Binding<
  Skills.Payload,
  Skills.Response
> = PuppeteerSession.Fetchable.bind(Skills);
