import cli from '@battis/qui-cli';
import cliProgress from 'cli-progress';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import * as common from '../common.js';
import * as Args from './Download/Args.js';
import { Spider } from './Download/Spider.js';
import * as Snapshot from './Snapshot.js';

export * as Args from './Download/Args.js';

export async function download(
  snapshotPathArg?: string,
  args: Args.Parsed = Args.defaults
) {
  const { outputOptions, ...options } = args;
  const { quit } = options;
  const { pretty } = outputOptions;
  let { outputPath } = outputOptions;

  const spinner = ora();
  spinner.start('Reading snaphot file');

  const snapshotPath = path.resolve(process.cwd(), snapshotPathArg!);

  if (!outputPath) {
    outputPath = path.join(
      path.dirname(snapshotPath!),
      path.basename(snapshotPath!, '.json')
    );
  } else {
    if (fs.existsSync(outputPath)) {
      outputPath = await common.Output.avoidOverwrite(
        path.join(outputPath, path.basename(snapshotPath!, '.json'))
      );
    }
  }

  const Start = new Date();
  let snapshots: Snapshot.All.Data;
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
  const spider = new Spider({
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
  const Finish = new Date();

  const index = [];
  for (const fileName of indices) {
    if (fileName) {
      index.push(
        JSON.parse(
          fs
            .readFileSync(
              common.Output.filePathFromOutputPath(outputPath, fileName)!
            )
            .toString()
        )
      );
      fs.unlinkSync(
        common.Output.filePathFromOutputPath(outputPath, fileName)!
      );
    }
  }
  const indexPath = common.Output.filePathFromOutputPath(
    outputPath,
    'index.json'
  );
  await common.Output.writeJSON(indexPath, index, { pretty });
  await common.Output.writeJSON(
    path.resolve(indexPath, '../metadata.json'),
    {
      snapshotPath,
      Start,
      Finish,
      Elapsed: Finish.getTime() - Start.getTime(),
      ...options,
      credentials: undefined
    },
    { pretty }
  );

  if (quit) {
    await spider.quit();
  }
  spinner.succeed(
    `Snapshot supporting files exported to ${cli.colors.url(path.dirname(indexPath!))}`
  );
}
