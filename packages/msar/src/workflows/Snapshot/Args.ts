import * as common from '../../common.js';
import * as Flags from './Args/flags.js';
import * as Options from './Args/options.js';
import { Parsed } from './Args/parse.js';

export * from './Args/parse.js';
export const flags = Flags.flags;
export const options = Options.options;

export const defaults: Parsed = {
  credentials: {},
  ...common.Args.defaults,
  snapshotOptions: {
    ...Flags.defaults.snapshotOptions,
    ...Options.defaults.snapshotOptions,
    payload: {
      format: 'json',
      ...Flags.defaults.snapshotOptions.payload,
      ...Options.defaults.snapshotOptions.payload
    }
  },
  all: Flags.defaults.all,
  allOptions: Options.defaults.allOptions
};
