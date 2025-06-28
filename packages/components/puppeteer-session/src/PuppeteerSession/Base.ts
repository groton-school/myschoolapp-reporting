import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { JSONValue } from '@battis/typescript-tricks';
import { RateLimiter } from '@msar/rate-limiter';
import { Mutex, MutexInterface } from 'async-mutex';
import puppeteer, { GoToOptions, Page } from 'puppeteer';
import { InitializationError } from './InitializationError.js';
import * as Storage from './Storage.js';

export type Options = Parameters<typeof puppeteer.launch>[0] & {
  logRequests?: boolean;
};

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

  private logRequests = false;

  protected constructor(page: Page);
  protected constructor(url: URL | string, options?: Options);
  protected constructor(pageOrUrl: Page | URL | string, options?: Options);
  protected constructor(
    pageOrUrl: Page | URL | string,
    { logRequests, ...options }: Options = {}
  ) {
    if (logRequests !== undefined) {
      this.logRequests = logRequests;
    }
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
    { headless, defaultViewport }: Options = {},
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
    initialized?: MutexInterface.Releaser
  ) {
    // @ts-expect-error 2345 Plugin.hydrate typing is too narrow
    headless = Plugin.hydrate(headless, Storage.headless());
    // @ts-expect-error 2345 Plugin.hydrate typing is too narrow
    defaultViewport = Plugin.hydrate(defaultViewport, {
      height: Storage.viewportHeight(),
      width: Storage.viewportWidth()
    });
    const browser = await puppeteer.launch({ headless, defaultViewport });
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
    logRequest = this.logRequests
  ): Promise<FetchResponse> {
    await this.ready();
    const response = await RateLimiter.add(
      (async () => {
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
      }).bind(this)
    );
    if (!response) {
      throw new Error(
        `Rate-limited fetch returned void: ${Log.syntaxColor({ input, init, response })}`
      );
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
