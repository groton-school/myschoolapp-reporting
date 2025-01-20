import cli from '@battis/qui-cli';
import * as common from '../../../common.js';

export const defaults = {
  ...common.Args.defaults,
  puppeteerOptions: {
    ...common.Args.defaults.puppeteerOptions,
    headless: true
  }
};

export const flags = {
  ...common.Args.flags,
  headless: {
    ...common.Args.flags.headless,
    description: common.Args.flags.headless?.description.replace(
      `default: ${cli.colors.value('false')}`,
      `default: ${cli.colors.value(defaults.puppeteerOptions.headless)}, use ${cli.colors.value('--no-headless')} to not run headless. Due to the number of impersonated clicks necessary for this workflow, running headless reduces the likelihood of stray user actions interfering with the script.`
    ),
    default: defaults.puppeteerOptions.headless
  }
};
