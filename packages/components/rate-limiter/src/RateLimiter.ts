import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import PQueue from 'p-queue';

export type Configuration = Plugin.Configuration & {
  /** number of concurrent threads */
  concurrency?: number;
  /** server requests per second */
  rate?: number;
};

export const name = '@msar/rate-limiter';
export const src = import.meta.dirname;

let _concurrency = 1;
let queue: PQueue | undefined = undefined;

let _requests = 0;
let start: number | undefined = undefined;
let end = Date.now();

export function configure(config: Configuration = {}) {
  _concurrency = Plugin.hydrate(config.concurrency, _concurrency);
  queue = new PQueue({
    concurrency: _concurrency,
    interval:
      config.rate === undefined ? 1 : (1000 / config.rate) * _concurrency // milliseconds
  });
}

export function options(): Plugin.Options {
  return {
    num: {
      concurrency: {
        description: `The number of concurrent threads to run (default ${Colors.value(_concurrency)})`,
        default: _concurrency
      },
      rate: {
        description: `The number of server requests allowed per second`
      }
    }
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  configure(args.values);
}

export function concurrency() {
  return _concurrency;
}

export async function add<T>(task: () => T) {
  if (!queue) {
    throw new Error(`Rate-limit queue has not been initialized`);
  }
  if (start === undefined) {
    start = Date.now();
  }
  _requests++;
  const result = await queue.add(task);
  end = Date.now();
  return result;
}

export function requests() {
  return _requests;
}

export function actual() {
  if (start === undefined) {
    throw new Error(`No requests have been made`);
  }
  return (1000 * _requests) / (end - start);
}
