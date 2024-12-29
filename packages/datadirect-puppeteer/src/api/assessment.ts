import { AssessmentGetSpa as AssessmentSPA } from 'datadirect/dist/api/assessment.js';
import { Page } from 'puppeteer';
import * as PuppeteerSession from '../PuppeteerSession.js';

export class assessment extends PuppeteerSession.Fetchable {
  public AssessmentGetSpa: PuppeteerSession.BoundEndpoint<
    AssessmentSPA.Payload,
    AssessmentSPA.Response
  >;

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);

    this.AssessmentGetSpa = this.bindEndpoint(AssessmentSPA);
  }
}
