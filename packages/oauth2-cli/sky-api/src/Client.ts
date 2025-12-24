import { OAuth2 } from '@oauth2-cli/qui-cli-plugin';
import { Colors } from '@qui-cli/colors';
import { Env } from '@qui-cli/env-1password';
import * as Plugin from '@qui-cli/plugin';

OAuth2.configure({
  authorization_endpoint: 'https://app.blackbaud.com/oauth/authorize',
  token_endpoint: 'https://oauth2.sky.blackbaud.com/token',
  env: {
    client_id: 'SKY_CLIENT_ID',
    client_secret: 'SKY_CLIENT_SECRET',
    redirect_uri: 'SKY_REDIRECT_URI',
    token_path: 'SKY_TOKEN_PATH',
    access_token: 'SKY_ACCESS_TOKEN'
  },
  man: { heading: 'Sky API options' },
  suppress: {
    authorizationEndpoint: true,
    tokenEndpoint: true,
    tokenPath: true
  }
});

export type Configuration = Plugin.Configuration & {
  subscription_key?: string;
  subscriptionKeyEnvVar: string;
};

export const name = '@oauth2-cli/sky-api';

const config: Configuration = {
  subscriptionKeyEnvVar: 'SKY_SUBSCRIPTION_KEY'
};

export function configure(proposal: Partial<Configuration> = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

export function options(): Plugin.Options {
  return {
    opt: {
      subscriptionKey: {
        description: `Blackbaud subscription access key; will use environment variable ${Colors.varName(config.subscriptionKeyEnvVar)} if present`,
        secret: true,
        default: config.subscription_key
      }
    }
  };
}

export async function init({
  values
}: Plugin.ExpectedArguments<typeof options>) {
  const {
    subscriptionKey: subscription_key = await Env.get({
      key: config.subscriptionKeyEnvVar
    })
  } = values;
  configure({ subscription_key, ...values });
  OAuth2.configure({
    headers: { 'Bb-Api-Subscription-Key': config.subscription_key }
  });
}

export const getToken = OAuth2.getToken;
export const request = OAuth2.request;
export const requestJSON = OAuth2.requestJSON;

/** @deprecated Use {@link requestJSON} */
export const fetch = OAuth2.request;
