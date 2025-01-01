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

  public constructor(
    url: URL | string | Page,
    {
      credentials,
      timeout = Authenticated.DefaultTimeout,
      ...options
    }: Options = {}
  ) {
    super(url, options);
    this.authenticating.acquire().then((release) => {
      if (url instanceof Page) {
        this.appLoaded(timeout, release);
      } else {
        this.login({ credentials, timeout }, release);
      }
    });
  }

  public async appLoaded(
    timeout = Authenticated.DefaultTimeout,
    release?: MutexInterface.Releaser
  ) {
    await super.ready();
    await this.page.waitForSelector('div#site-header', { timeout });
    if (release) {
      release();
    }
  }

  private async login(
    {
      credentials: { username, password, sso } = {},
      timeout = Authenticated.DefaultTimeout
    }: Options,
    release?: MutexInterface.Releaser
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

    await this.appLoaded(timeout, release);
  }

  public async ready() {
    await super.ready();
    (await this.authenticating.acquire())();
    return this;
  }

  public async user(): Promise<string> {
    await this.ready();
    return await this.page.evaluate(
      async () => (await BBAuthClient.BBAuth.getDecodedToken(null)).email
    );
  }

  public async fork(
    path: URL | string,
    timeout = Authenticated.DefaultTimeout
  ) {
    await this.ready();
    const fork = await super.fork(path);
    const page = fork.page;
    const session = new Authenticated(page);
    await session.appLoaded(timeout);
    return session;
  }
}
