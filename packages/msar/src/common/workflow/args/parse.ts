import { defaults } from './options.js';

export type Parsed = {
  ignoreErrors: boolean;
  concurrentThreads: number;
  logRequests: boolean;
};

export function parse(values: Record<string, any>): Parsed {
  return {
    ignoreErrors: !!values.ignoreErrors,
    concurrentThreads: parseInt(
      values.concurrentThreads || defaults.concurrentThreads.toString()
    ),
    logRequests: !!values.logRequests
  };
}
