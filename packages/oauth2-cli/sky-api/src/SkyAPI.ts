import * as OAuth2 from '@oauth2-cli/qui-cli/dist/OAuth2.js';
import { Colors } from '@qui-cli/colors';
import { Env } from '@qui-cli/env-1password';
import * as Plugin from '@qui-cli/plugin';
import { Client } from './Client.js';

export {
  EnvironmentStorage,
  FileStorage,
  TokenStorage
} from '@oauth2-cli/qui-cli/dist/OAuth2.js';
export * from './Client.js';
export * as school from './school/index.js';

type SkyConfiguration = {
  subscription_key?: string;
  subscriptionKeyEnvVar: string;
};

export type Configuration = OAuth2.Configuration & SkyConfiguration;
export type ConfigurationProposal = OAuth2.ConfigurationProposal &
  Partial<SkyConfiguration>;

export class SkyAPIPlugin extends OAuth2.OAuth2Plugin<Client> {
  private skyConfig: SkyConfiguration = {
    subscriptionKeyEnvVar: 'SKY_SUBSCRIPTION_KEY'
  };

  public constructor(name = '@oauth2-cli/sky-api') {
    super(name);
    super.configure({
      authorization_endpoint: 'https://app.blackbaud.com/oauth/authorize',
      token_endpoint: 'https://oauth2.sky.blackbaud.com/token',
      opt: {
        clientId: 'skyClientId',
        clientSecret: 'skyClientSecret',
        scope: 'skyScope',
        redirectUri: 'skyRedirectUri'
      },
      env: {
        clientId: 'SKY_CLIENT_ID',
        clientSecret: 'SKY_CLIENT_SECRET',
        scope: 'SKY_SCOPE',
        redirectUri: 'SKY_REDIRECT_URI',
        tokenPath: 'SKY_TOKEN_PATH',
        accessToken: 'SKY_ACCESS_TOKEN'
      },
      man: { heading: 'Sky API options' },
      suppress: {
        authorizationEndpoint: true,
        tokenEndpoint: true,
        tokenPath: true,
        accessToken: true
      }
    });
  }

  public configure({
    subscription_key,
    subscriptionKeyEnvVar,
    ...proposal
  }: ConfigurationProposal = {}): void {
    super.configure(proposal);
    this.skyConfig.subscription_key =
      subscription_key || this.skyConfig.subscription_key;
    this.skyConfig.subscriptionKeyEnvVar =
      subscriptionKeyEnvVar || this.skyConfig.subscriptionKeyEnvVar;
  }

  public options(): Plugin.Options {
    const options = super.options();
    options.opt = {
      ...options.opt,
      subscriptionKey: {
        description:
          `Blackbaud subscription access key; will use environment ` +
          `variable ${Colors.varName(this.skyConfig.subscriptionKeyEnvVar)} ` +
          `if present`,
        secret: true,
        default: this.skyConfig.subscription_key
      }
    };
    return options;
  }

  public async init({ values }: Plugin.ExpectedArguments<typeof this.options>) {
    const {
      subscriptionKey: subscription_key = await Env.get({
        key: this.skyConfig.subscriptionKeyEnvVar
      })
    } = values;
    this.configure({
      subscription_key,
      ...values
    });
  }

  protected instantiateClient(credentials: OAuth2.Credentials): Client {
    if (!this.skyConfig.subscription_key) {
      throw new Error('No subscription access key is defined.');
    }
    return new Client({
      subscription_key: this.skyConfig.subscription_key,
      ...credentials
    });
  }
}
