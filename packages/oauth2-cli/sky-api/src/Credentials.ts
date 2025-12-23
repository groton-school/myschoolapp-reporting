import * as OAuth2 from 'oauth2-cli';

export type Credentials = Omit<
  OAuth2.Credentials,
  'authorization_endpoint' | 'token_endpoint'
> & {
  subscription_key: string;
};
