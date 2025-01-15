import cli from '@battis/qui-cli';
import ora from 'ora';
import * as Args from './Snapshot/Args.js';
import * as All from './Snapshot/Manager/All.js';
import * as Single from './Snapshot/Manager/Single.js';

export { All, Args, Single };

export async function snapshot(
  url?: URL | string,
  args: Args.Parsed = Args.defaults
) {
  const { all, snapshotOptions, allOptions, ...options } = args;

  if (!url) {
    throw new Error(
      `${cli.colors.value('arg0')} must be the URL of an LMS instance`
    );
  }

  if (all) {
    await All.snapshot({
      url,
      ...snapshotOptions,
      ...allOptions,
      ...options
    });
  } else {
    const spinner = ora();
    spinner.start(`Capturing snapshot from ${cli.colors.url(url)}`);
    const snapshot = await Single.snapshot({
      url,
      ...snapshotOptions,
      ...options
    });
    spinner.succeed(
      `Captured snapshot of ${snapshot?.SectionInfo?.Teacher}'s ${snapshot?.SectionInfo?.SchoolYear} ${snapshot?.SectionInfo?.Duration} ${snapshot?.SectionInfo?.GroupName}`
    );
  }
}
