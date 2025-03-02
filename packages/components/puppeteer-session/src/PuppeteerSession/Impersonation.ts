import { Colors } from '@battis/qui-cli.colors';
import { Mutex, MutexInterface } from 'async-mutex';
import { api as types } from 'datadirect';
import ora from 'ora';
import { HTTPResponse, Page } from 'puppeteer';
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
  private isHeadless: boolean;

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
    this.isHeadless = !!options.headless;
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
    const spinner = ora();
    const contextReady = await impersonationContext.acquire();
    await this.page.waitForSelector('#SelectSearchIn');
    await this.page.select('#SelectSearchIn', searchIn);
    await this.page.type('#SearchVal', val);
    await this.page.click('#searchForm .btn[value="Search"]');

    const searchResultsSelector = '#searchResults .SearchResultRow';
    await this.page.waitForSelector(searchResultsSelector);

    const contextWatcher = (async (response: HTTPResponse) => {
      if (response.url().match(/\/api\/webapp\/context/)) {
        const context: types.webapp.context.Response = await response.json();
        if (!context.IsImpersonating || !context.MasterUserInfo) {
          this.isSelf = true;
        }
        this.userInfo = context.UserInfo;
        contextReady();
        this.page.off('response', contextWatcher);
      }
    }).bind(this);
    this.page.on('response', contextWatcher);

    if (
      (await this.page.evaluate((searchResultsSelector) => {
        return document.querySelectorAll(searchResultsSelector).length;
      }, searchResultsSelector)) === 1
    ) {
      await this.page.click(searchResultsSelector);
    } else {
      if (this.isHeadless) {
        throw new Error(
          `Multiple search results for impersonation query ${Colors.quotedValue(`"${val}"`)} in ${Colors.value(searchIn)}. Cannot interactively choose in headless mode.`
        );
      }
      spinner.start(
        'More than one user matched your impersonation search. Please select the desired user in your browser.'
      );
    }
    await impersonationContext.acquire();
    if (spinner.isSpinning) {
      spinner.succeed(
        `Impersonating ${Colors.value(this.userInfo?.UserNameFormatted)} (manual selection)`
      );
    }
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
