import cli from '@battis/qui-cli';

export const defaults = {
  batchSize: 10
};

export const options = {
  batchSize: {
    description: `Number of simultaneous requests to batch together (default: ${cli.colors.value(defaults.batchSize)})`,
    default: defaults.batchSize.toString()
  }
};
