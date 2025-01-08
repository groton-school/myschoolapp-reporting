import cli from '@battis/qui-cli';
import { PuppeteerSession } from 'datadirect-puppeteer';
import * as common from '../../../common.js';

export const defaults = {
  vals: [] as string[],
  column: 'User ID',
  searchIn: 'UserID',
  outputOptions: {
    ...common.Args.defaults.outputOptions,
    outputPath: 'inboxAnalysis.csv'
  }
};

export const options = {
  ...common.Args.options,
  outputPath: {
    ...common.Args.options.outputPath,
    description: common.Args.options.outputPath?.description.replace(
      common.Args.defaults.outputOptions.outputPath,
      defaults.outputOptions.outputPath
    ),
    default: defaults.outputOptions.outputPath
  },
  column: {
    description: `Column label for CSV input (${cli.colors.value('arg1')}) column containing user identifier for inboxes to analyze. Required if opening a CSV of user identifiers. (default: ${cli.colors.quotedValue(`"${defaults.column}"`)})`,
    default: defaults.column
  },
  searchIn: {
    description: `Field to search for user identifier. Required for all uses. One of ${[
      ...Object.keys(PuppeteerSession.SearchIn),
      ...Object.values(PuppeteerSession.SearchIn)
    ]
      .map((key) => cli.colors.quotedValue(`"${key}"`))
      .join(', ')
      .replace(
        /, ([^,]+)$/,
        ' or $1'
      )} (default: ${cli.colors.quotedValue(`"${defaults.searchIn}"`)})`,
    default: defaults.searchIn
  }
};

export const optList = {
  val: {
    description: `A user identifier to query. Requires corresponding ${cli.colors.value('--searchIn')}. If set, ${cli.colors.value('arg1')} path to CSV file is not required.`,
    short: 'v',
    default: defaults.vals
  }
};
