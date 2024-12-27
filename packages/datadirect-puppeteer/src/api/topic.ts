import { topicassignmentsget as TopicAssignments } from 'datadirect/dist/api/topic.js';
import { fetchViaPuppeteer } from './fetchViaPuppeteer.js';

export const topicassignmentsget = fetchViaPuppeteer<
  TopicAssignments.Payload,
  TopicAssignments.Response
>(TopicAssignments);
