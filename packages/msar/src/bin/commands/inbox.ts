import cli from '@battis/qui-cli';
import * as Inbox from '../../workflows/Inbox.js';

(async () => {
  const {
    positionals: [url, pathToUserListCsv],
    values
  } = cli.init({
    args: {
      requirePositionals: true,
      ...Inbox.Args,
      man: [
        {
          text: `Analyze inbox contents for a user or users. Include the URL of the LMS instance as ${cli.colors.value('arg0')} (required) and path to a CSV file of user identifiers to analyze as ${cli.colors.value('arg1')} (optional if ${cli.colors.value('--val')} is set). Intended to receive a generic ${cli.colors.url('UserWorkList.csv')} export from the LMS as input, outputting the same CSV file to ${cli.colors.value('--outputPath')} with analysis columns appended.`
        }
      ]
    }
  });

  await Inbox.analytics(url, pathToUserListCsv, Inbox.Args.parse(values));
})();
