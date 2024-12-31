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
  protected static readonly Authenticated = 'authenticated';

  private authenticated = false;

  public constructor(
    url: URL | string | Page,
    { credentials, timeout, ...options }: Options = {}
  ) {
    super(url, options);
    this.login({ credentials, timeout });
  }

  async appLoaded(timeout: number) {
    await this.page.waitForSelector('div#site-header', { timeout });
    this.authenticated = true;
    this.emit(Authenticated.Authenticated);
  }

  private async login({
    credentials: { username, password, sso } = {},
    timeout = Authenticated.DefaultTimeout
  }: Options) {
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

    await this.appLoaded(timeout);
  }

  public async ready() {
    return new Promise<Authenticated>(
      ((resolve: (session: Authenticated) => void) => {
        if (!this.authenticated) {
          this.addListener(
            Authenticated.Authenticated,
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

  public async user(): Promise<string> {
    return await this.page.evaluate(
      async () => (await BBAuthClient.BBAuth.getDecodedToken(null)).email
    );
  }

  public async fork(
    path: URL | string,
    timeout = Authenticated.DefaultTimeout
  ) {
    const page = (await super.fork(path)).page;
    const session = new Authenticated(page);
    await session.appLoaded(timeout);
    return session;
  }
}
