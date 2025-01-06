import { Mutex, MutexInterface } from 'async-mutex';
import { Page } from 'puppeteer';
import * as Authenticated from './Authenticated.js';

export type ImpersonateOptions = {
  searchType: string;
  query: string;
};

export type Options = Authenticated.Options & ImpersonateOptions;

export class Impersonation extends Authenticated.Authenticated {
  public static readonly LastName = 'lastname';
  public static readonly FirstName = 'firstname';
  public static readonly Email = 'email';
  public static readonly MaidenName = 'maidenname';
  public static readonly PreferredName = 'nickname';
  public static readonly BusinessName = 'business_name';
  public static readonly UserID = 'pk';
  public static readonly HostID = 'conversion_string';

  private impersonating = new Mutex();

  protected constructor(url: URL | string, options: Options);
  protected constructor(pageOrUrl: Page | URL | string, options: Options);
  protected constructor(
    pageOrUrl: Page | URL | string,
    { searchType, query, ...options }: Options
  ) {
    super(pageOrUrl, options);
    this.impersonating.acquire().then((impersonated) => {
      this.impersonate({ searchType, query }, impersonated);
    });
  }

  public static async getInstance(url: URL | string, options: Options) {
    return await new Impersonation(url, options).ready();
  }

  public async impersonate(
    { searchType, query }: ImpersonateOptions,
    impersonated?: MutexInterface.Releaser
  ) {
    await super.ready();
    await this.page.goto(
      `https://${new URL(this.page.url()).host}/app/faculty#impersonate`
    );
    await this.page.waitForSelector('#SelectSearchIn');
    await this.page.select('#SelectSearchIn', searchType);
    await this.page.type('#SearchVal', query);
    await this.page.click('#searchForm .btn[value="Search"]');
    await this.page.waitForSelector('#searchResults .SearchResultRow');
    if (
      (await this.page.evaluate(() => {
        return document.querySelectorAll('#searchResults .SearchResultRow')
          .length;
      })) === 1
    ) {
      await this.page.click('#searchResults .SearchResultRow');

      await this.page.waitForSelector('#impersonate-banner');
      if (impersonated) {
        impersonated();
      }
    } else {
      // more than one result!
    }
  }

  protected async ready() {
    if (this.impersonating.isLocked()) {
      const ready = await this.impersonating.acquire();
      ready();
    }
    return this;
  }
}
