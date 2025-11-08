import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  ignoreErrors?: boolean;
  logRequests?: boolean;
};

export const name = '@msar/workflow';

const props = {
  ignoreErrors: true,
  logRequests: false
};

export function ignoreErrors() {
  return props.ignoreErrors;
}

export function logRequests() {
  return props.logRequests;
}

export function configure(config: Configuration = {}) {
  props.ignoreErrors = Plugin.hydrate(config.ignoreErrors, props.ignoreErrors);
  props.logRequests = Plugin.hydrate(config.logRequests, props.logRequests);
}

export function options(): Plugin.Options {
  return {
    man: [
      {
        level: 3,
        text: 'Workflow behavior options'
      }
    ],
    flag: {
      ignoreErrors: {
        description: `Continue run even if errors are encountered`,
        default: props.ignoreErrors
      },
      logRequests: {
        description: `Log fetch requests and responses for analysis and debugging`,
        default: props.logRequests
      }
    }
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  configure(args.values);
}
