import * as Output from './Output.js';
import * as PuppeteerSession from './PuppeteerSession.js';
import * as Workflow from './Workflow.js';

export type Options = {
  workflow?: boolean;
  output?: boolean;
  puppeteerSession?: boolean;
};

export type Parsed = Workflow.Args.Parsed &
  Output.Args.Parsed &
  PuppeteerSession.Args.Parsed;

export function pickFlags({
  workflow = true,
  output = true,
  puppeteerSession = true
}: Options = {}) {
  return {
    ...(workflow ? Workflow.Args.flags : {}),
    ...(output ? Output.Args.flags : {}),
    ...(puppeteerSession ? PuppeteerSession.Args.flags : {})
  };
}

export const flags = pickFlags();

export function pickOptions({
  workflow = true,
  output = true,
  puppeteerSession = true
}: Options = {}) {
  return {
    ...(workflow ? Workflow.Args.options : {}),
    ...(output ? Output.Args.options : {}),
    ...(puppeteerSession ? PuppeteerSession.Args.options : {})
  };
}

export const options = pickOptions();

export function parse(values: Record<string, any>) {
  return {
    ...Workflow.Args.parse(values),
    ...Output.Args.parse(values),
    ...PuppeteerSession.Args.parse(values)
  };
}

export const defaults = {
  ...Workflow.Args.defaults,
  ...Output.Args.defaults,
  ...PuppeteerSession.Args.defaults
};

export function hydrate<T extends Record<string, any>>(
  proposal: T | undefined | null,
  defaults: T
): T {
  const result = { ...proposal };
  for (const prop in defaults) {
    if (prop in result) {
      if (
        typeof defaults[prop] === 'object' &&
        !Array.isArray(defaults[prop])
      ) {
        result[prop] = hydrate(result[prop], defaults[prop]);
      }
    } else {
      result[prop] = defaults[prop];
    }
  }
  return result as T;
}
