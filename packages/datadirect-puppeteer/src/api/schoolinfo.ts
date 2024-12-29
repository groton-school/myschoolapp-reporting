import { schoolparams as S } from 'datadirect/dist/api/schoolinfo.js';
import { Page } from 'puppeteer';
import * as PuppeteerSession from '../PuppeteerSession.js';

export class schoolinfo extends PuppeteerSession.Fetchable {
  public schoolparams: PuppeteerSession.BoundEndpoint<S.Payload, S.Response>;

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);

    this.schoolparams = this.bindEndpoint(S);
  }
}
