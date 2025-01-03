import * as Output from './Output.js';
import * as PuppeteerSession from './PuppeteerSession.js';
import * as Workflow from './Workflow.js';

export type Options = {
  workflow?: boolean;
  output?: boolean;
  puppeteerSession?: boolean;
};

export type Parsed = Workflow.args.Parsed &
  Output.args.Parsed &
  PuppeteerSession.args.Parsed;

export function pickFlags({
  workflow = true,
  output = true,
  puppeteerSession = true
}: Options = {}) {
  return {
    ...(workflow ? Workflow.args.flags : {}),
    ...(output ? Output.args.flags : {}),
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
    ...(workflow ? Workflow.args.options : {}),
    ...(output ? Output.args.options : {}),
    ...(puppeteerSession ? PuppeteerSession.args.options : {})
  };
}

export const options = pickOptions();

export function parse(values: Record<string, string>) {
  return {
    ...Workflow.args.parse(values),
    ...Output.args.parse(values),
    ...PuppeteerSession.args.parse(values)
  };
}

export const defaults = {
  ...Workflow.args.defaults,
  ...Output.args.defaults,
  ...PuppeteerSession.args.defaults
};
