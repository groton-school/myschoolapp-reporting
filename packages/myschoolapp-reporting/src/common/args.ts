import * as _output from './output.js';
import * as PuppeteerSession from './PuppeteerSession.js';
import * as _workflow from './workflow.js';

export type Options = {
  workflow?: boolean;
  output?: boolean;
  puppeteerSession?: boolean;
};

export type Parsed = _workflow.args.Parsed &
  _output.args.Parsed &
  PuppeteerSession.args.Parsed;

export function pickFlags({
  workflow = true,
  output = true,
  puppeteerSession = true
}: Options = {}) {
  return {
    ...(workflow ? _workflow.args.flags : {}),
    ...(output ? _output.args.flags : {}),
    ...(puppeteerSession ? PuppeteerSession.args.flags : {})
  };
}

export const flags = pickFlags();

export function pickOptions({
  workflow = true,
  output = true,
  puppeteerSession = true
}: Options = {}) {
  return {
    ...(workflow ? _workflow.args.options : {}),
    ...(output ? _output.args.options : {}),
    ...(puppeteerSession ? PuppeteerSession.args.options : {})
  };
}

export const options = pickOptions();

export function parse(values: Record<string, string>) {
  return {
    ..._workflow.args.parse(values),
    ..._output.args.parse(values),
    ...PuppeteerSession.args.parse(values)
  };
}

export const defaults = {
  ..._workflow.args.defaults,
  ..._output.args.defaults,
  ...PuppeteerSession.args.defaults
};
