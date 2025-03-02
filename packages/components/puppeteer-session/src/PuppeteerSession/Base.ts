import { Log } from '@battis/qui-cli.log';
import { JSONValue } from '@battis/typescript-tricks';
import { Mutex, MutexInterface } from 'async-mutex';
import puppeteer, { GoToOptions, Page } from 'puppeteer';
import { InitializationError } from './InitializationError.js';

export type Options = Parameters<typeof puppeteer.launch>[0];

export type FetchResponse = {
  url: string;
  redirected: boolean;
  type: string;
  status: number;
  statusText: string;
  headers: Headers;
  body?: Blob | string | JSONValue | FormData;
};

export class Base {
  private initializing = new Mutex();

  private _page?: Page;
  public get page() {
    if (!this._page) {
      throw new InitializationError('page');
    }
    return this._page;
  }
  private set page(page) {
    this._page = page;
  }

  protected constructor(page: Page);
  protected constructor(url: URL | string, options?: Options);
  protected constructor(pageOrUrl: Page | URL | string, options?: Options);
  protected constructor(pageOrUrl: Page | URL | string, options: Options = {}) {
    if (pageOrUrl instanceof Page) {
      this.page = pageOrUrl;
    } else {
      this.initializing.acquire().then((initialized) => {
        this.openURL(pageOrUrl, options, initialized);
      });
    }
  }

  public static async getInstance(url: URL | string, options?: Options) {
    return await new Base(url, options).ready();
  }

  private async openURL(
    url: URL | string,
    options: Options = {
      headless: false,
      defaultViewport: { height: 0, width: 0 }
      /*
       * TODO Why doesn't Chrome consistently receive CDP directives?
       *   Theoretically this should work, but it seems to have zero impact on actual behavior
       *   ```ts
       *   downloadBehavior: {
       *     policy: 'allowAndName',
       *     downloadPath: '/desired/path/to/downloads'
       *   }
       *  ```
       */
    },
    initialized?: MutexInterface.Releaser
  ) {
    const browser = await puppeteer.launch(options);
    const [page] = await browser.pages();
    await page.goto(new URL(url).toString());
    this.page = page;
    if (initialized) {
      initialized();
    }
  }

  protected async ready() {
    if (this.initializing.isLocked()) {
      const ready = await this.initializing.acquire();
      ready();
    }
    return this;
  }

  public async clone() {
    await this.ready();
    return await new Base(this.page).ready();
  }

  public async fork(path: URL | string) {
    await this.ready();
    const baseUrl = await this.url();
    const fork = await this.clone();
    const initialized = await fork.initializing.acquire();
    fork.page = await fork.page.browser().newPage();
    await fork.page.goto(new URL(path, baseUrl).toString());
    initialized();
    return fork;
  }

  public async url() {
    await this.ready();
    return new URL(this.page.url());
  }

  public async goto(url: URL | string, options: GoToOptions = {}) {
    return this.page.goto(url.toString(), options);
  }

  public async fetch(
    input: URL | string,
    init?: RequestInit,
    logRequest = false
  ): Promise<FetchResponse> {
    await this.ready();
    const url = new URL(input, this.page.url());
    const response = await this.page.evaluate(
      async (input, init) => {
        const response = await fetch(input, init);
        let body: FetchResponse['body'] = undefined;
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          body = (await response.json()) as JSONValue;
        } else if (contentType?.includes('text/')) {
          body = await response.text();
        } else {
          body = await response.blob();
        }
        return {
          url: response.url,
          redirected: response.redirected,
          type: response.type,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body
        };
      },
      url,
      init
    );
    if (logRequest) {
      Log.debug({ url, init, response });
    }
    return response;
  }

  public async close() {
    await this.ready();
    if ((await this.page.browser().pages()).length === 1) {
      await this.page.browser().close();
    } else {
      await this.page.close();
    }
  }
}
