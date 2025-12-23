import { PuppeteerSession } from '@msar/puppeteer-session';

export * as assessment from './assessment.js';
export * as assignment from './assignment.js';
export * as Assignment2 from './Assignment2.js';
export * as Competency from './Competency.js';
export * as Course from './Course.js';
export * as datadirect from './datadirect.js';
export * as googleapi from './googleapi.js';
export * as gradebook from './gradebook.js';
export * as LtiTool from './LtiTool.js';
export * as media from './media.js';
export * as message from './message.js';
export * as Photocategory from './Photocategory.js';
export * as Rubric from './Rubric.js';
export * as schoolinfo from './schoolinfo.js';
export * as topic from './topic.js';
export * as webapp from './webapp.js';

export const init = PuppeteerSession.Fetchable.init;
