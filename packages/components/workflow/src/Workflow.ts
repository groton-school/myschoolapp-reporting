import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';

export type Configuration = Plugin.Configuration & {
  ignoreErrors?: boolean;
  logRequests?: boolean;
  concurrentThreads?: number;
};

export const name = '@msar/workflow';
export const src = import.meta.dirname;

const props = {
  ignoreErrors: true,
  logRequests: false,
  concurrentThreads: 10
};

export function ignoreErrors() {
  return props.ignoreErrors;
}

export function logRequests() {
  return props.logRequests;
}

export function concurrentThreads() {
  return props.concurrentThreads;
}

export function configure(config: Configuration = {}) {
  props.ignoreErrors = Plugin.hydrate(config.ignoreErrors, props.ignoreErrors);
  props.logRequests = Plugin.hydrate(config.logRequests, props.logRequests);
  props.concurrentThreads = Plugin.hydrate(
    config.concurrentThreads,
    props.concurrentThreads
  );
}

export function options(): Plugin.Options {
  return {
    flag: {
      ignoreErrors: {
        description: `Continue collecting snapshots even if errors are encountered (default: ${Colors.value(props.ignoreErrors)}${props.ignoreErrors ? `, use ${Colors.value('--no--ignoreErrors')} to halt on errors` : ''})`,
        default: props.ignoreErrors
      },
      logRequests: {
        description: `Log fetch requests and responses for analysis and debugging (default: ${Colors.value(props.logRequests)})`,
        default: props.logRequests
      }
    },
    num: {
      concurrentThreads: {
        description: `Maximum number of concurrent threads (default: ${Colors.value(props.concurrentThreads)})`,
        default: props.concurrentThreads,
        validate: (value?) => value && value > 0
      }
    }
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  configure(args.values);
}
