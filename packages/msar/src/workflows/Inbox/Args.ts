import * as common from '../../common.js';
import * as options from './Args/options.js';

export * from './Args/flags.js';
export * from './Args/options.js';
export * from './Args/parse.js';

export const defaults = {
  credentials: {},
  ...common.Args.defaults,
  ...options.defaults
};
