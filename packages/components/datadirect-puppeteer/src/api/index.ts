import { PuppeteerSession } from '@msar/puppeteer-session';

export * as Assessment from './Assessment.js';
export * as Assignment from './Assignment.js';
export * as Assignment2 from './Assignment2.js';
export * as Audio from './Audio.js';
export * as AudioCategory from './AudioCategory.js';
export * as Competency from './Competency.js';
export * as Course from './Course.js';
export * as DataDirect from './DataDirect.js';
export * as GoogleAPI from './GoogleAPI.js';
export * as Gradebook from './Gradebook.js';
export * as LTITool from './LTITool.js';
export * as Media from './Media.js';
export * as Message from './Message.js';
export * as Photo from './Photo.js';
export * as PhotoCategory from './PhotoCategory.js';
export * as Rubric from './Rubric.js';
export * as SchoolInfo from './SchoolInfo.js';
export * as Topic from './Topic.js';
export * as Video from './Video.js';
export * as VideoCategory from './VideoCategory.js';
export * as WebApp from './WebApp.js';

export const init = PuppeteerSession.Fetchable.init;
