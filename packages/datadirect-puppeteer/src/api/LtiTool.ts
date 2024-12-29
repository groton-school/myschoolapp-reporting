import {
  Edit as E,
  ProviderList as Providers
} from 'datadirect/dist/api/LtiTool.js';
import { Page } from 'puppeteer';
import * as PuppeteerSession from '../PuppeteerSession.js';

export class LtiTool extends PuppeteerSession.Fetchable {
  public ProviderList: PuppeteerSession.BoundEndpoint<
    Providers.Payload,
    Providers.Response
  >;
  public Edit: PuppeteerSession.BoundEndpoint<E.Payload, E.Response>;

  // TODO Edit.Delete is not fetched

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);

    this.ProviderList = this.bindEndpoint(Providers);
    this.Edit = this.bindEndpoint(E);
  }
}
