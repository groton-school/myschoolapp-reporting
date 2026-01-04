import { register } from '@qui-cli/plugin';
import { Client } from './SkyAPI.js';

export * as SkyAPI from './SkyAPI.js';

await register(Client);
