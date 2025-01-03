import cli from '@battis/qui-cli';

export const defaults = {
  ignoreErrors: true,
  logRequests: false
};

export const flags = {
  ignoreErrors: {
    description: `Continue collecting snapshots even if errors are encountered (default: ${cli.colors.value(defaults.ignoreErrors)}${defaults.ignoreErrors ? `, use ${cli.colors.value('--no-ignoreErrors')} to halt on errors` : ''})`,
    default: defaults.ignoreErrors
  },
  logRequests: {
    description: `Log fetch requests and responses for analysis and debugging (default: ${cli.colors.value(defaults.logRequests)})`
  }
};
