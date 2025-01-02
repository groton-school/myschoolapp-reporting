import { topicassignmentsget as TopicAssignments } from 'datadirect/dist/api/topic.js';
import { Fetchable } from '../PuppeteerSession.js';

export const topicassignmentsget: Fetchable.Binding<
  TopicAssignments.Payload,
  TopicAssignments.Response
> = Fetchable.bind(TopicAssignments);
