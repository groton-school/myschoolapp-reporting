import { Credentials, SkyAPI } from '@oauth2-cli/sky-api';

let _sky: SkyAPI | undefined = undefined;

export function init(credentials: Credentials) {
  _sky = new SkyAPI({ store: './var/sky-api.json', ...credentials });
}

export function sky() {
  if (!_sky) {
    throw new Error(`Sky API has not been initialized`);
  }
  return _sky;
}
