import cli from '@battis/qui-cli';
import * as Snapshot from '../../workflows/Snapshot.js';

(async () => {
  const {
    positionals: [url],
    values
  } = cli.init({
    args: {
      requirePositionals: 1,
      ...Snapshot.Args,
      man: [
        {
          text: `Capture a JSON snapshot of an individual course or of a collection of courses (using the ${cli.colors.value('all')} flag). In addition to relevant flags and options, the only argument expected is a URL to a page within the target course (or target LMS instance, if snapshotting more than one course).`
        }
      ]
    }
  });

  await Snapshot.snapshot(url, Snapshot.Args.parse(values));
})();
