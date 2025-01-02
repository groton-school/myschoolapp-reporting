import cli from '@battis/qui-cli';
import * as Snapshot from '../../workflows/Snapshot.js';

(async () => {
  const {
    positionals: [url],
    values
  } = cli.init({
    args: {
      requirePositionals: 1,
      options: Snapshot.args.options,
      flags: Snapshot.args.flags,
      man: [
        {
          text: `Capture a JSON snapshot of an individual course or of a collection of courses (using the ${cli.colors.value('all')} flag). In addition to relevant flags and options, the only argument expected is a URL to a page within the target course (or target LMS instance, if snapshotting more than one course).`
        }
      ]
    }
  });

  if (!url) {
    throw new Error(
      `${cli.colors.value('arg0')} must be the URL of an LMS instance`
    );
  }

  const { all, snapshotOptions, allOptions, ...options } =
    Snapshot.args.parse(values);

  if (all) {
    await Snapshot.snapshotAll({
      url,
      ...snapshotOptions,
      ...allOptions,
      ...options
    });
  } else {
    const spinner = cli.spinner();
    spinner.start(`Capturing snapshot from ${cli.colors.url(url)}`);
    const snapshot = await Snapshot.snapshot({
      url,
      ...snapshotOptions,
      ...options
    });
    spinner.succeed(
      `Captured snapshot of ${snapshot?.SectionInfo?.Teacher}'s ${snapshot?.SectionInfo?.SchoolYear} ${snapshot?.SectionInfo?.Duration} ${snapshot?.SectionInfo?.GroupName}`
    );
  }
})();
