import cli from '@battis/qui-cli';

export const defaults = {
  ignoreErrors: true
};

export const flags = {
  ignoreErrors: {
    description: `Continue collecting snapshots even if errors are encountered (default: ${cli.colors.value(defaults.ignoreErrors)}, use ${cli.colors.value('--no-ignoreErrors')} to halt on errors)`,
    default: defaults.ignoreErrors
  }
};
