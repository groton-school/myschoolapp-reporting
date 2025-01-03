import * as common from '../../../common.js';

export type Parsed = common.Args.Parsed & {
  include?: RegExp[];
  exclude?: RegExp[];
};

function stringToRegExpArray(arg: string): RegExp[] | undefined {
  return arg && arg !== ''
    ? arg.split(',').map((exp) => new RegExp(exp))
    : undefined;
}

export function parse(values: Record<string, any>): Parsed {
  return {
    ...common.Args.parse(values),
    include: stringToRegExpArray(values.include),
    exclude: stringToRegExpArray(values.exclude)
  };
}
