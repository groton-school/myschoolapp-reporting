import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import { Base } from './Base.js';

export { Authenticated, Credentials, Options } from './Authenticated.js';
export { Base, Options as PuppeteerOptions } from './Base.js';
export * as Fetchable from './Fetchable.js';
export * from './Impersonation.js';
export * from './InitializationError.js';

export type Configuration = Plugin.Configuration & {
  headless?: boolean;
  quit?: boolean;
  username?: string;
  password?: string;
  sso?: 'entra-id';
  mfa?: string;
  viewportWidth?: number;
  viewportHeight?: number;
};

export const name = '@msar/puppeteer-session';
export const src = import.meta.dirname;

let headless = false;
let quit = true;
let username: string | undefined = undefined;
let password: string | undefined = undefined;
let sso: string | undefined = undefined;
let mfa: string | undefined = undefined;
let viewportWidth = 0;
let viewportHeight = 0;

export function configure(config: Configuration = {}) {
  headless = Plugin.hydrate(config.headless, headless);
  quit = Plugin.hydrate(config.quit, quit);
  username = Plugin.hydrate(config.username, username);
  password = Plugin.hydrate(config.password, password);
  sso = Plugin.hydrate(config.sso, sso);
  mfa = Plugin.hydrate(config.mfa, mfa);
  viewportWidth = Plugin.hydrate(config.viewportWidth, viewportWidth);
  viewportHeight = Plugin.hydrate(config.viewportHeight, viewportHeight);
}

export function options(): Plugin.Options {
  return {
    flag: {
      headless: {
        description: `Run Puppeteer's Chrome instance headless (default: ${Colors.value(
          headless
        )})`,
        default: headless
      },
      quit: {
        description: `Quit Puppeteer's Chrome instance on successful completion (default: ${Colors.value(quit)}, ${Colors.value(
          `--no-quit`
        )} to leave Puppeteer's Chrome instance open)`,
        default: quit
      }
    },
    opt: {
      username: {
        short: 'u',
        description: 'MySchoolApp username'
      },
      password: {
        short: 'p',
        description: 'MySchoolApp password'
      },
      sso: {
        description: `MySchoolApp SSO configuration (currently only accepts ${Colors.quotedValue('"entra-id"')})`
      },
      mfa: {}
    },
    num: {
      viewportWidth: {
        default: viewportWidth
      },
      viewportHeight: {
        default: viewportHeight
      }
    }
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  configure(args.values);
}

export async function open(url: string | URL) {
  return await Base.getInstance(url, {
    headless,
    defaultViewport: { width: viewportWidth, height: viewportHeight }
  });
}
