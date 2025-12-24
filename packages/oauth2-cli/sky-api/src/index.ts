import { register } from '@qui-cli/plugin';
import * as Client from './Client.js';

export * as SkyAPI from './SkyAPI.js';

await register(Client);
