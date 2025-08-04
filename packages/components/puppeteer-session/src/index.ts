import { register } from '@qui-cli/plugin';
import * as PuppeteerSession from './PuppeteerSession/index.js';

await register(PuppeteerSession);
export { PuppeteerSession };
