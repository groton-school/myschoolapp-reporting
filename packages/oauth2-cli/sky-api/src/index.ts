import { register } from '@qui-cli/plugin';
import * as SkyAPI from './Module.js';

export { SkyAPI };

await register(SkyAPI);
