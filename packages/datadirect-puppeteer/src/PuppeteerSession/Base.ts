import { JSONValue } from '@battis/typescript-tricks';
import { EventEmitter } from 'node:events';
import puppeteer, { Page } from 'puppeteer';

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
  public constructor() {
    super('The session has been accessed before initialization is complete.');
  }
}

export class Base extends EventEmitter {
  protected static readonly Ready = 'ready';

  private _page?: Page;
  public get page() {
    if (!this._page) {
      throw new InitializationError();
    }
    return this._page;
  }
  private set page(page) {
    this._page = page;
    this.emit(Base.Ready);
  }

  public constructor(url: URL | string | Page, options: Options = {}) {
    super();
    if (url instanceof Page) {
      this.page = url;
    } else {
      this.openURL(url, options);
    }
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
    }
  ) {
    const browser = await puppeteer.launch(options);
    const [page] = await browser.pages();
    await page.goto(new URL(url).toString());
    this.page = page;
  }

  public async ready() {
    return new Promise<Base>(
      ((resolve: (session: Base) => void) => {
        if (!this._page) {
          this.addListener(
            Base.Ready,
            (() => {
              resolve(this);
            }).bind(this)
          );
        } else {
          resolve(this);
        }
      }).bind(this)
    );
  }

  public async fork(path: URL | string) {
    const page = await this.page.browser().newPage();
    await page.goto(new URL(path, this.page.url()).toString());
    return await new Base(page).ready();
  }

  public async fetch(
    input: URL | string,
    init?: RequestInit
  ): Promise<FetchResponse> {
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
    if (this.page.browser().pages.length === 1) {
      await this.page.browser().close();
    } else {
      await this.page.close();
    }
  }
}
