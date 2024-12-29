import { hydrategradebook as Gradebook } from 'datadirect/dist/api/gradebook.js';
import { Page } from 'puppeteer';
import * as PuppeteerSession from '../PuppeteerSession.js';

export class gradebook extends PuppeteerSession.Fetchable {
  public hydrategradebook: PuppeteerSession.BoundEndpoint<
    Gradebook.Payload,
    Gradebook.Response
  >;

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);

    this.hydrategradebook = this.bindEndpoint(Gradebook);
  }
}
