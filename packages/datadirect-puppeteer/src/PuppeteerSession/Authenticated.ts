import { Mutex, MutexInterface } from 'async-mutex';
import { Page } from 'puppeteer';
import { Base, Options as BaseOptions } from './Base.js';

export type Credentials = {
  username?: string;
  password?: string;
  sso?: string;
};

export type Options = BaseOptions & {
  credentials?: Credentials;
  timeout?: number;
};

export class Authenticated extends Base {
  public static readonly DefaultTimeout = 300000;
  private authenticating = new Mutex();

  protected constructor(page: Page);
  protected constructor(url: URL | string, options?: Options);
  protected constructor(
    pageOrUrl: Page | URL | string,
    {
      credentials,
      timeout = Authenticated.DefaultTimeout,
      ...options
    }: Options = {}
  ) {
    super(pageOrUrl, options);
    this.authenticating.acquire().then((authenticated) => {
      if (pageOrUrl instanceof Page) {
        this.appLoaded(timeout, authenticated);
      } else {
        this.login({ credentials, timeout }, authenticated);
      }
    });
  }

  public static async getInstance(url: URL | string, options?: Options) {
    return await new Authenticated(url, options).ready();
  }

  private async appLoaded(
    timeout = Authenticated.DefaultTimeout,
    authenticated?: MutexInterface.Releaser
  ) {
    await super.ready();
    await this.page.waitForSelector('div#site-header', { timeout });
    if (authenticated) {
      authenticated();
    }
  }

  private async login(
    {
      credentials: { username, password, sso } = {},
      timeout = Authenticated.DefaultTimeout
    }: Options,
    authenticated?: MutexInterface.Releaser
  ) {
    await super.ready();
    if (username) {
      // Blackbaud username entry
      const userField = await this.page.waitForSelector('input#Username', {
        timeout
      });
      const nextButton = await this.page.waitForSelector('input#nextBtn');
      if (userField) {
        await userField.type(username);
        await nextButton?.click();
      }
    }

    if (password) {
      if (sso == 'entra-id') {
        const passwordField = await this.page.waitForSelector(
          'input[name="passwd"]',
          {
            timeout
          }
        );
        const submitButton = await this.page.waitForSelector(
          'input[type="submit"]'
        );
        if (passwordField) {
          await passwordField.type(password);
          await submitButton?.click();
        }
      }
    }

    await this.appLoaded(timeout, authenticated);
  }

  protected async ready() {
    if (this.authenticating.isLocked()) {
      const ready = await this.authenticating.acquire();
      ready();
    }
    return this;
  }

  public async user(): Promise<string> {
    await this.ready();
    return await this.page.evaluate(
      async () => (await BBAuthClient.BBAuth.getDecodedToken(null)).email
    );
  }

  public async clone() {
    await this.ready();
    return await new Authenticated(this.page).ready();
  }

  public async fork(
    path: URL | string,
    timeout = Authenticated.DefaultTimeout
  ) {
    await this.ready();
    const url = await this.url();
    const fork = await this.clone();
    const ready = await fork.authenticating.acquire();
    await fork.goto(new URL(path, url));
    await fork.appLoaded(timeout, ready);
    return fork;
  }
}
