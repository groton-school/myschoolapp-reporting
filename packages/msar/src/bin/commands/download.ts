import cli from '@battis/qui-cli';
import * as Download from '../../workflows/Download.js';

(async () => {
  const {
    positionals: [snapshotPath],
    values
  } = cli.init({
    args: {
      requirePositionals: 1,
      ...Download.Args,
      man: [
        {
          text: `Download the supporting files for an existing snapshot JSON file.. This command expects either 1 or 2 arguments: at least a path to an existing snapshot file (${cli.colors.value('arg0')}), and optionally also the desired path to the output folder of supporting files (${cli.colors.value('arg1')}).`
        }
      ]
    }
  });

  await Download.download(snapshotPath, Download.Args.parse(values));
})();
