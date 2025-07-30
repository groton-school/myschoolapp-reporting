import { PuppeteerSession } from '@msar/puppeteer-session';
import { topicassignmentsget as TopicAssignments } from 'datadirect/dist/api/topic/index.js';

export const topicassignmentsget: PuppeteerSession.Fetchable.Binding<
  TopicAssignments.Payload,
  TopicAssignments.Response
> = PuppeteerSession.Fetchable.bind(TopicAssignments);
