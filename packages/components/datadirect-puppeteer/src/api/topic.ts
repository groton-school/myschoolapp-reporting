import { PuppeteerSession } from '@msar/puppeteer-session';
import { TopicAssignments } from 'datadirect/dist/Endpoints/API/Topic/index.js';

export const topicAssignments: PuppeteerSession.Fetchable.Binding<
  TopicAssignments.Payload,
  TopicAssignments.Response
> = PuppeteerSession.Fetchable.bind(TopicAssignments);
