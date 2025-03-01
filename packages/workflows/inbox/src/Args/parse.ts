import * as common from '../../../common.js';
import * as options from './options.js';

export type Parsed = {
  vals: string[];
  column: string;
  searchIn: string;
} & common.Args.Parsed;

export function parse(values: Record<string, any>): Parsed {
  return {
    ...common.Args.parse(values),
    vals: values.val || options.defaults.vals,
    column: values.column || options.defaults.column,
    searchIn: values.searchIn || options.defaults.searchIn
  };
}
