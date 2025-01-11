import cli from '@battis/qui-cli';

cli.init();
cli.log.error(
  `${cli.colors.value('myschoolapp-reporting')} has been renamed ${cli.colors.value('msar')} at version 0.5.0. Please remove ${cli.colors.value('myschoolapp-reporting')} and install ${cli.colors.value('msar')} instead.\n${cli.colors.url('https://www.npmjs.com/package/msar')}`
);
