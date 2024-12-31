import cli from '@battis/qui-cli';

export const defaults = {
  headless: false,
  quit: true
};

export const flags = {
  headless: {
    description: `Run Puppeteer's Chrome instance headless (default: ${cli.colors.value(defaults.headless)})`,
    default: defaults.headless
  },
  quit: {
    description: `Quit Puppeteer's Chrome instance on successful completion (default: ${cli.colors.value(defaults.quit)}, ${cli.colors.value(
      `--no-quit`
    )} to leave Puppeteer's Chrome instance open)`,
    default: defaults.quit
  }
};
