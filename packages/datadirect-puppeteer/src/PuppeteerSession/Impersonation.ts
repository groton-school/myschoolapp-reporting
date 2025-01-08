import { Mutex, MutexInterface } from 'async-mutex';
import { api as types } from 'datadirect';
import { Page } from 'puppeteer';
import * as Authenticated from './Authenticated.js';

export const SearchIn = {
  LastName: 'lastname',
  FirstName: 'firstname',
  Email: 'email',
  MaidenName: 'maidenname',
  PreferredName: 'nickname',
  BusinessName: 'business_name',
  UserID: 'pk',
  HostID: 'conversion_string'
};

export type ImpersonateOptions = {
  searchIn: string;
  val: string;
};

export type Options = Authenticated.Options & ImpersonateOptions;

export class Impersonation extends Authenticated.Authenticated {
  private impersonating = new Mutex();
  private isSelf = false;

  private _userInfo?: types.webapp.context.Response['UserInfo'];
  public get userInfo() {
    return this._userInfo;
  }
  private set userInfo(userInfo) {
    this._userInfo = userInfo;
  }

  protected constructor(url: URL | string, options: Options);
  protected constructor(pageOrUrl: Page | URL | string, options: Options);
  protected constructor(
    pageOrUrl: Page | URL | string,
    { searchIn, val, ...options }: Options
  ) {
    super(pageOrUrl, options);
    this.impersonating.acquire().then((impersonated) => {
      this.impersonate({ searchIn, val }, impersonated);
    });
  }

  public static async getInstance(
    authenticated: Authenticated.Authenticated,
    options: Options
  ): Promise<Impersonation>;
  public static async getInstance(
    url: URL | string,
    options: Options
  ): Promise<Impersonation>;
  public static async getInstance(
    sessionOrURL: Authenticated.Authenticated | URL | string,
    options: Options
  ) {
    if (sessionOrURL instanceof Authenticated.Authenticated) {
      const impersonation = new Impersonation(
        (
          await sessionOrURL.fork(
            `https://${(await sessionOrURL.url()).host}/app/faculty#impersonate`
          )
        ).page,
        options
      );
      return await impersonation.ready();
    } else {
      return await new Impersonation(sessionOrURL, options).ready();
    }
  }

  public async impersonate(
    { searchIn, val }: ImpersonateOptions,
    impersonated?: MutexInterface.Releaser
  ) {
    if (!Object.values(SearchIn).includes(searchIn)) {
      if (searchIn in SearchIn) {
        searchIn = SearchIn[searchIn as keyof typeof SearchIn];
      } else {
        throw new Error('Invalid searchIn value');
      }
    }

    await super.ready();
    if (new URL(this.page.url()).pathname !== '/app/faculty#impersonate') {
      await this.page.goto(
        `https://${new URL(this.page.url()).host}/app/faculty#impersonate`
      );
    }
    const impersonationContext = new Mutex();
    const contextReady = await impersonationContext.acquire();
    await this.page.waitForSelector('#SelectSearchIn');
    await this.page.select('#SelectSearchIn', searchIn);
    await this.page.type('#SearchVal', val);
    await this.page.click('#searchForm .btn[value="Search"]');
    await this.page.waitForSelector('#searchResults .SearchResultRow');
    if (
      (await this.page.evaluate(() => {
        return document.querySelectorAll('#searchResults .SearchResultRow')
          .length;
      })) === 1
    ) {
      this.page.on('response', async (response) => {
        if (response.url().match(/\/api\/webapp\/context/)) {
          const context: types.webapp.context.Response = await response.json();
          if (!context.IsImpersonating || !context.MasterUserInfo) {
            this.isSelf = true;
          }
          this.userInfo = context.UserInfo;
          contextReady();
        }
      });
      await this.page.click('#searchResults .SearchResultRow');
    } else {
      // FIXME Handle interactive response to multiple impersonation results
    }
    await impersonationContext.acquire();
    if (!this.isSelf) {
      await this.page.waitForSelector('#impersonate-banner');
    }
    if (impersonated) {
      impersonated();
    }
  }

  protected async ready() {
    if (this.impersonating.isLocked()) {
      const ready = await this.impersonating.acquire();
      ready();
    }
    return this;
  }

  public async close() {
    if (!this.isSelf) {
      await this.page.click('#end-impersonation');
      await this.page.waitForNavigation({
        waitUntil: 'domcontentloaded'
      });
    }
    await super.close();
  }
}
