import cli from '@battis/qui-cli';

export const defaults = {
  concurrentThreads: 10
};

export const options = {
  concurrentThreads: {
    description: `Maximum number of concurrent threads (default: ${cli.colors.value(defaults.concurrentThreads)})`,
    default: defaults.concurrentThreads.toString()
  }
};
