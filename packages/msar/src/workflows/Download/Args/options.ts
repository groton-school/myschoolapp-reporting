import cli from '@battis/qui-cli';
import path from 'node:path';
import * as common from '../../../common.js';

export const defaults = {
  include: [/^\//]
};

export const options = {
  ...common.Args.options,
  outputPath: {
    ...common.Args.options.outputPath,
    description: common.Args.options.outputPath?.description
      .replace(
        common.Args.defaults.outputOptions.outputPath,
        path.resolve(
          process.cwd(),
          common.Args.defaults.outputOptions.outputPath,
          ':SnapshotFile/'
        )
      )
      .replace(
        /\)$/,
        ` where ${cli.colors.value(':SnapshotFile')} is the basename (without file extension) of ${cli.colors.value('arg0')}.)`
      )
  },
  include: {
    description: `Comma-separated list of regular expressions to match URLs to be included in download (e.g. ${cli.colors.quotedValue('"^\\/,example\\.com"')}, default: ${cli.colors.quotedValue('"^\\/"')} to include only URLs that are paths on the LMS's servers)`,
    default: defaults.include.join(',').slice(1, -1)
  },
  exclude: {
    description: `Comma-separated list of regular expressions to match URLs to exclude from download (e.g. ${cli.colors.quotedValue('"example\\.com,foo\\..+\\.com"')}`
  }
};
