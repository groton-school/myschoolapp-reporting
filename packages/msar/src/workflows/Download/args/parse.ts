import * as common from '../../../common.js';

export type Parsed = common.args.Parsed & {
  downloadOptions: {
    include?: RegExp[];
    exclude?: RegExp[];
    haltOnError?: boolean;
  };
};

function stringToRegExpArray(arg: string): RegExp[] | undefined {
  return arg && arg !== ''
    ? arg.split(',').map((exp) => new RegExp(exp))
    : undefined;
}

export function parse(values: Record<string, any>): Parsed {
  return {
    ...common.args.parse(values),
    downloadOptions: {
      include: stringToRegExpArray(values.include),
      exclude: stringToRegExpArray(values.exclude),
      haltOnError: !!values.haltOnError
    }
  };
}
