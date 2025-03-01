import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';

export type Configuration = Plugin.Configuration & {
  ignoreErrors?: boolean;
  logRequests?: boolean;
  concurrentThreads?: number;
};

export const name = '@msar/workflow';
export const src = import.meta.dirname;

let _ignoreErrors = true;
let _logRequests = false;
let _concurrentThreads = 10;

export function configure(config: Configuration = {}) {
  _ignoreErrors = Plugin.hydrate(config.ignoreErrors, _ignoreErrors);
  _logRequests = Plugin.hydrate(config.logRequests, _logRequests);
  _concurrentThreads = Plugin.hydrate(
    config.concurrentThreads,
    _concurrentThreads
  );
}

export function options(): Plugin.Options {
  return {
    flag: {
      ignoreErrors: {
        description: `Continue collecting snapshots even if errors are encountered (default: ${Colors.value(_ignoreErrors)}${_ignoreErrors ? `, use ${Colors.value('--no-_ignoreErrors')} to halt on errors` : ''})`,
        default: _ignoreErrors
      },
      logRequests: {
        description: `Log fetch requests and responses for analysis and debugging (default: ${Colors.value(_logRequests)})`,
        default: _logRequests
      }
    },
    num: {
      concurrentThreads: {
        description: `Maximum number of concurrent threads (default: ${Colors.value(_concurrentThreads)})`,
        default: _concurrentThreads,
        validate: (value?) => value && value > 0
      }
    }
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  configure(args.values);
}

export function ignoreErrors() {
  return _ignoreErrors;
}

export function logRequests() {
  return _logRequests;
}

export function concurrentThreads() {
  return _concurrentThreads;
}
