import { Colors } from '@qui-cli/colors';
import '@qui-cli/env/1Password.js';
import * as Plugin from '@qui-cli/plugin';
import { Base } from './Base.js';
import * as Storage from './Storage.js';

export { Authenticated, Credentials, Options } from './Authenticated.js';
export { Base, Options as PuppeteerOptions } from './Base.js';
export * as Fetchable from './Fetchable.js';
export * from './Impersonation.js';
export * from './InitializationError.js';
export { Configuration } from './Storage.js';

const PUPPETEER_MFA = 'PUPPETEER_MFA';
const PUPPETEER_SSO = 'PUPPETEER_SSO';

export const name = '@msar/puppeteer-session';

export function configure(config: Storage.Configuration = {}) {
  Storage.headless(Plugin.hydrate(config.headless, Storage.headless()));
  Storage.quit(Plugin.hydrate(config.quit, Storage.quit()));
  Storage.username(Plugin.hydrate(config.username, Storage.username()));
  Storage.password(Plugin.hydrate(config.password, Storage.password()));
  Storage.sso(Plugin.hydrate(config.sso, Storage.sso()));
  Storage.mfa(Plugin.hydrate(config.mfa, Storage.mfa()));
  Storage.viewportWidth(
    Plugin.hydrate(config.viewportWidth, Storage.viewportWidth())
  );
  Storage.viewportHeight(
    Plugin.hydrate(config.viewportHeight, Storage.viewportHeight())
  );
}

export function options(): Plugin.Options {
  return {
    man: [
      {
        level: 1,
        text: 'Puppeteer options'
      }
    ],
    flag: {
      headless: {
        description: `Run Puppeteer's Chrome instance headless (default: ${Colors.value(
          Storage.headless()
        )})`,
        default: Storage.headless()
      },
      quit: {
        description: `Quit Puppeteer's Chrome instance on successful completion (default: ${Colors.value(Storage.quit())}, ${Colors.value(
          `--no-quit`
        )} to leave Puppeteer's Chrome instance open)`,
        default: Storage.quit()
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
        description: `MySchoolApp SSO configuration (currently only accepts ${Colors.quotedValue(
          '"entra-id"'
        )}, will use the value in environment variable ${Colors.value(PUPPETEER_SSO)} if present)`
      },
      mfa: {
        description: `MySchoolApp MFA configuration (currently only accepts ${Colors.quotedValue(
          '"entra-id"'
        )}, will use the value in environment variable ${Colors.value(PUPPETEER_MFA)} if present)`
      }
    },
    num: {
      viewportWidth: {
        default: Storage.viewportWidth()
      },
      viewportHeight: {
        default: Storage.viewportHeight()
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure({
    mfa: process.env[PUPPETEER_MFA],
    sso: process.env[PUPPETEER_SSO],
    ...values
  });
}

export async function open(url: string | URL) {
  return await Base.getInstance(url, {
    headless: Storage.headless(),
    defaultViewport: {
      width: Storage.viewportWidth(),
      height: Storage.viewportHeight()
    }
  });
}

export function quit() {
  return Storage.quit();
}
