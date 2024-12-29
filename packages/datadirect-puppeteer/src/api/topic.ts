import { topicassignmentsget as TopicAssignments } from 'datadirect/dist/api/topic.js';
import { Page } from 'puppeteer';
import * as PuppeteerSession from '../PuppeteerSession.js';

export class topic extends PuppeteerSession.Fetchable {
  public topicassignmentsget: PuppeteerSession.BoundEndpoint<
    TopicAssignments.Payload,
    TopicAssignments.Response
  >;

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);

    this.topicassignmentsget = this.bindEndpoint(TopicAssignments);
  }
}
