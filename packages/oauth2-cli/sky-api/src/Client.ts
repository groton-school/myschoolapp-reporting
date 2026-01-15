import * as OAuth2 from '@oauth2-cli/qui-cli/dist/OAuth2.js';

export type Credentials = OAuth2.Credentials & { subscription_key: string };

export class Client extends OAuth2.Client {
  private subscription_key: string;

  public constructor({ subscription_key, ...credentials }: Credentials) {
    super(credentials);
    this.subscription_key = subscription_key;
  }

  public request(...args: Parameters<OAuth2.Client['request']>) {
    const [url, method, body, headers = new Headers(), dPoPOptions] = args;
    headers.set('Bb-Api-Subscription-Key', this.subscription_key);
    return super.request(url, method, body, headers, dPoPOptions);
  }
}
