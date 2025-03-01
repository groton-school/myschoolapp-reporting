import { register } from '@battis/qui-cli.plugin';
import * as DatadirectPuppeteer from './DatadirectPuppeteer.js';

await register(DatadirectPuppeteer);
export { DatadirectPuppeteer };
