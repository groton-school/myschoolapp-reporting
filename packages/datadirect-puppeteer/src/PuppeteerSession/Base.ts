import { JSONValue } from '@battis/typescript-tricks';
import { Mutex, MutexInterface } from 'async-mutex';
import puppeteer, { GoToOptions, Page } from 'puppeteer';

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

export class InitializationError extends Error {
  public constructor(message?: string) {
    super(
      `The session has been accessed before initialization is complete${message ? `: ${message}` : '.'}`
    );
  }
}

export class Base {
  private loading = new Mutex();

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

  public constructor(url: URL | string | Page, options: Options = {}) {
    this.loading.acquire().then((release) => {
      if (url instanceof Page) {
        this.page = url;
        release();
      } else {
        this.openURL(url, options, release);
      }
    });
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
    release?: MutexInterface.Releaser
  ) {
    const browser = await puppeteer.launch(options);
    const [page] = await browser.pages();
    await page.goto(new URL(url).toString());
    this.page = page;
    if (release) {
      release();
    }
  }

  public async ready() {
    (await this.loading.acquire())();
    return this;
  }

  public async fork(path: URL | string) {
    await this.ready();
    const page = await this.page.browser().newPage();
    await page.goto(new URL(path, this.page.url()).toString());
    return new Base(page);
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
    init?: RequestInit
  ): Promise<FetchResponse> {
    await this.ready();
    return await this.page.evaluate(
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
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body
        };
      },
      new URL(input, this.page.url()),
      init
    );
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
