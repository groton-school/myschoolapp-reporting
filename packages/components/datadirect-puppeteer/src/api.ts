import { PuppeteerSession } from '@msar/puppeteer-session';

export * as assessment from './api/assessment.js';
export * as assignment from './api/assignment.js';
export * as Assignment2 from './api/Assignment2.js';
export * as Competency from './api/Competency.js';
export * as Course from './api/Course.js';
export * as datadirect from './api/datadirect.js';
export * as googleapi from './api/googleapi.js';
export * as gradebook from './api/gradebook.js';
export * as LtiTool from './api/LtiTool.js';
export * as media from './api/media.js';
export * as message from './api/message.js';
export * as Rubric from './api/Rubric.js';
export * as schoolinfo from './api/schoolinfo.js';
export * as topic from './api/topic.js';
export * as webapp from './api/webapp.js';

export const init = PuppeteerSession.Fetchable.init;
