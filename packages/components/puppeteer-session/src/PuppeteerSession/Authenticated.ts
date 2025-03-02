import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import { Mutex, MutexInterface } from 'async-mutex';
import ora from 'ora';
import { HTTPResponse, Page } from 'puppeteer';
import { Base, Options as BaseOptions } from './Base.js';
import * as Storage from './Storage.js';

export type Credentials = {
  username?: string;
  password?: string;
  sso?: string;
  mfa?: string;
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
  protected constructor(pageOrUrl: Page | URL | string, options?: Options);
  protected constructor(
    pageOrUrl: Page | URL | string,
    {
      credentials,
      timeout = Authenticated.DefaultTimeout,
      ...options
    }: Options = {}
  ) {
    super(pageOrUrl, options);
    credentials = {
      username: Plugin.hydrate(credentials?.username, Storage.username()),
      password: Plugin.hydrate(credentials?.password, Storage.password()),
      sso: Plugin.hydrate(credentials?.sso, Storage.sso()),
      mfa: Plugin.hydrate(credentials?.mfa, Storage.mfa())
    };
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

  protected async appLoaded(
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
      credentials: { username, password, sso, mfa } = {},
      timeout = Authenticated.DefaultTimeout
    }: Options,
    authenticated?: MutexInterface.Releaser
  ) {
    await super.ready();
    const spinner = ora();
    spinner.start(`Awaiting interactive login…`);

    if (username) {
      spinner.start('Entering pre-configured username');
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
        spinner.start('Entering pre-configured password');
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

        if (mfa === 'authenticator') {
          const redirectWatcher = (async (response: HTTPResponse) => {
            if (new URL(response.url()).hostname === 'sts.sky.blackbaud.com') {
              this.page.off('response', redirectWatcher);
              spinner.start('MFA complete');
            }
          }).bind(this);
          this.page.on('response', redirectWatcher);
          const message =
            (await (
              await this.page.waitForSelector('#idDiv_SAOTCAS_Description')
            )?.evaluate((elt) => elt.textContent)) || 'Awaiting MFA';
          const displaySign = await (
            await this.page.waitForSelector('.displaySign')
          )?.evaluate((elt) => elt.textContent);
          spinner.start(`${message} ${Colors.value(displaySign)}`);
        }
      }
    }

    await this.appLoaded(timeout, authenticated);
    spinner.succeed('Authenticated');
  }

  protected async ready() {
    if (this.authenticating.isLocked()) {
      const ready = await this.authenticating.acquire();
      ready();
    }
    return this;
  }

  public async decodedToken(): Promise<DecodedToken> {
    await this.ready();
    return await this.page.evaluate(
      async () => await BBAuthClient.BBAuth.getDecodedToken(null)
    );
  }

  /** Deprecated: use Authenticated.decodedToken().email */
  public async user(): Promise<string> {
    return (await this.decodedToken()).email;
  }

  public async clone() {
    await this.ready();
    return await new Authenticated(this.page).ready();
  }

  public async fork(path: URL | string) {
    await this.ready();
    const base = await super.fork(path);
    return await new Authenticated(base.page).ready();
  }

  public async baseFork(path: URL | string) {
    await this.ready();
    return await super.fork(path);
  }
}
