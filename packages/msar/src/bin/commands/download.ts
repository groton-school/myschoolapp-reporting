import cli from '@battis/qui-cli';
import cliProgress from 'cli-progress';
import fs from 'node:fs';
import path from 'node:path';
import * as common from '../../common.js';
import * as Download from '../../workflows/Download.js';
import * as Snapshot from '../../workflows/Snapshot.js';

(async () => {
  const {
    positionals: [snapshotPathArg],
    values
  } = cli.init({
    args: {
      requirePositionals: 1,
      ...Download.args,
      man: [
        {
          text: 'Download the supporting files for an existing snapshot JSON file.. This command expects either 1 or 2 arguments: at least a path to an existing snapshot file, and optionally also the desired path to the output folder of supporting files.'
        }
      ]
    }
  });

  const { outputOptions, ...options } = Download.args.parse(values);
  const { quit } = options;
  const { pretty } = outputOptions;
  let { outputPath } = outputOptions;

  const spinner = cli.spinner();
  spinner.start('Reading snaphot file');

  const snapshotPath = path.resolve(process.cwd(), snapshotPathArg!);

  if (!outputPath) {
    outputPath = path.join(
      path.dirname(snapshotPath!),
      path.basename(snapshotPath!, '.json')
    );
  } else {
    if (fs.existsSync(outputPath)) {
      outputPath = await common.output.avoidOverwrite(
        path.join(outputPath, path.basename(snapshotPath!, '.json'))
      );
    }
  }

  let snapshots: Snapshot.Data[];
  const data = JSON.parse(fs.readFileSync(snapshotPath).toString());
  if (Array.isArray(data)) {
    snapshots = data;
  } else {
    snapshots = [data];
  }
  spinner.succeed(
    `Read ${snapshots.length} snapshots from ${cli.colors.url(snapshotPath)}`
  );

  const host = snapshots
    .map((snapshot) => snapshot.Metadata.Host)
    .reduce((host: string | undefined, other: string) => {
      if (!host) {
        return other;
      } else if (host !== other) {
        throw new Error('Multiple hosts present in snapshot file.');
      }
    }, undefined);
  if (!host) {
    throw new Error('No host present in snapshot file.');
  }
  const spider = new Download.Spider({
    host,
    outputOptions: { ...outputOptions, outputPath },
    ...options
  });
  const indices: (string | undefined)[] = [];

  const progress = new cliProgress.MultiBar({});
  const bar = progress.create(snapshots.length, 0);
  for (const snapshot of snapshots) {
    progress.log(
      `Downloading ${snapshot.SectionInfo?.Teacher}'s ${snapshot.SectionInfo?.SchoolYear} ${snapshot.SectionInfo?.GroupName} ${snapshot.SectionInfo?.Block}`
    );
    indices.push(
      await spider.download(snapshot, {
        ...options,
        outputOptions: { ...outputOptions, outputPath }
      })
    );
    bar.increment();
  }
  bar.stop();

  const index = [];
  for (const fileName of indices) {
    if (fileName) {
      index.push(
        JSON.parse(
          fs
            .readFileSync(
              common.output.filePathFromOutputPath(outputPath, fileName)!
            )
            .toString()
        )
      );
      fs.unlinkSync(
        common.output.filePathFromOutputPath(outputPath, fileName)!
      );
    }
  }
  const indexPath = common.output.filePathFromOutputPath(
    outputPath,
    'index.json'
  );
  await common.output.writeJSON(indexPath, index, { pretty });

  if (quit) {
    await spider.quit();
  }
  spinner.succeed(
    `Snapshot supporting files exported to ${cli.colors.url(path.dirname(indexPath!))}`
  );
})();
