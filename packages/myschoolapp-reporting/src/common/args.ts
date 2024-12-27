import * as _output from './output/args.js';
import * as _puppeteer from './puppeteer/args.js';

type Options = { SkyAPI?: boolean; output?: boolean; puppeteer?: boolean };

export function pickFlags({ output = true, puppeteer = true }: Options = {}) {
  return {
    ...(output ? _output.flags : {}),
    ...(puppeteer ? _puppeteer.flags : {})
  };
}

export const flags = pickFlags();

export function pickOptions({ output = true, puppeteer = true }: Options = {}) {
  return {
    ...(output ? _output.options : {}),
    ...(puppeteer ? _puppeteer.options : {})
  };
}

export const options = pickOptions();

export function parse(values: Record<string, string>) {
  return {
    ..._output.parse(values),
    ..._puppeteer.parse(values)
  };
}
