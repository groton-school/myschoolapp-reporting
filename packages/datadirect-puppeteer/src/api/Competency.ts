import {
  CompetencySetup as Setup,
  CompetencySkillAssignmentGet as Skills
} from 'datadirect/dist/api/Competency.js';
import { Fetchable } from '../PuppeteerSession.js';

export const CompetencySetup: Fetchable.Binding<Setup.Payload, Setup.Response> =
  Fetchable.bind(Setup);

export const CompetencySkillAssignmentGet: Fetchable.Binding<
  Skills.Payload,
  Skills.Response
> = Fetchable.bind(Skills);
