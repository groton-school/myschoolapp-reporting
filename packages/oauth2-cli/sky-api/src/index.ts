import { register } from '@qui-cli/plugin';
import * as SkyAPI from './SkyAPI.js';

export { SkyAPI };

await register(SkyAPI);
