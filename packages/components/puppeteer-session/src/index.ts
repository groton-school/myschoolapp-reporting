import { register } from '@battis/qui-cli.plugin';
import * as PuppeteerSession from './PuppeteerSession/index.js';

await register(PuppeteerSession);
export { PuppeteerSession };
