import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { Progress } from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { RateLimiter } from '@msar/rate-limiter';
import * as Archive from '@msar/types.archive';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import * as Cache from './Cache.js';
import { Spider } from './Spider.js';

export type Configuration = Plugin.Configuration & {
  include?: RegExp | RegExp[];
  exclude?: RegExp | RegExp[];
  snapshotPath?: string;
  continue?: boolean;
};

await Core.configure({ core: { requirePositionals: 1 } });

export const name = '@msar/download';
export const src = import.meta.dirname;

let include = [/^\/.*/];
let exclude = [/^https?:/];
let snapshotPath: string | undefined = undefined;
let retry = false;

export function configure(config: Configuration = {}) {
  const _include = Plugin.hydrate(config.include, include);
  const _exclude = Plugin.hydrate(config.exclude, exclude);

  if (Array.isArray(_include)) {
    include = _include;
  } else {
    include = [_include];
  }

  if (Array.isArray(_exclude)) {
    exclude = _exclude;
  } else {
    exclude = [_exclude];
  }

  snapshotPath = Plugin.hydrate(config.snapshotPath, snapshotPath);
  retry = Plugin.hydrate(config.retry, retry);
}

export function options(): Plugin.Options {
  return {
    flag: {
      retry: {
        description: `Retry a previously started archive process. ${Colors.value('arg0')} must be the path to an existing archive index.json file.`
      }
    },
    opt: {
      include: {
        description: `Comma-separated list of regular expressions to match URLs to be included in download (e.g. ${Colors.quotedValue('"^\\/,example\\.com"')}, default: ${Colors.quotedValue(`"${include.join(', ').slice(1, -1)}"`)} to include only URLs that are paths on the LMS's servers)`,
        default: include.join(',').slice(1, -1)
      },
      exclude: {
        description: `Comma-separated list of regular expressions to match URLs to exclude from download (e.g. ${Colors.quotedValue('"example\\.com,foo\\..+\\.com"')}, default: ${Colors.quotedValue(`"${exclude.join(', ').slice(1, -1)}`)})`,
        default: exclude.join(',').slice(1, -1)
      }
    },
    man: [
      {
        text: `Download the supporting files for an existing snapshot JSON file.. This command expects either 1 or 2 arguments: at least a path to an existing snapshot file (${Colors.value('arg0')}), and optionally also the desired path to the output folder of supporting files (${Colors.value('arg1')}).`
      }
    ]
  };
}

function stringToRegExpArray(arg?: string): RegExp[] | undefined {
  return arg && arg !== ''
    ? arg.split(',').map((exp) => new RegExp(exp))
    : undefined;
}

export function init({
  values,
  positionals: [snapshotPath]
}: Plugin.ExpectedArguments<typeof options>) {
  include = Plugin.hydrate(stringToRegExpArray(values.include), include);
  exclude = Plugin.hydrate(stringToRegExpArray(values.exclude), exclude);
  configure({ ...values, include, exclude, snapshotPath });
}

export async function run() {
  const spinner = ora('Reading snaphot file').start();

  snapshotPath = path.resolve(Root.path(), snapshotPath!);

  if (retry) {
    Output.configure({ outputPath: path.dirname(snapshotPath) });
  } else {
    if (!Output.outputPath()) {
      Output.configure({
        outputPath: path.join(
          path.dirname(snapshotPath!),
          path.basename(snapshotPath!, '.json')
        )
      });
    } else {
      if (fs.existsSync(Output.outputPath())) {
        Output.configure({
          outputPath: await Output.avoidOverwrite(
            path.join(
              Output.outputPath(),
              path.basename(snapshotPath!, '.json')
            )
          )
        });
      }
    }
  }

  const Start = new Date();
  let snapshots: Archive.Multiple.Data;
  const data = JSON.parse(fs.readFileSync(snapshotPath).toString());
  if (Array.isArray(data)) {
    snapshots = data;
  } else {
    snapshots = [data];
  }
  spinner.succeed(
    `Read ${snapshots.length} snapshots from ${Colors.url(snapshotPath)}`
  );
  if (retry) {
    Log.info(`Retrying archive`);
    snapshots = Cache.build(snapshots);
  }

  const host = snapshots
    .map((snapshot) => snapshot.Metadata.Host)
    .reduce((host: string | undefined, other: string) => {
      if (!host) {
        return other;
      } else if (host !== other) {
        throw new Error('Multiple hosts present in snapshot file.');
      }
      return host;
    }, undefined);
  if (!host) {
    throw new Error('No host present in snapshot file.');
  }
  const spider = new Spider({
    host
  });
  const indices: (string | undefined)[] = [];

  Progress.start({ max: snapshots.length, value: 0 });
  for (const snapshot of snapshots) {
    Progress.caption(
      `Downloading ${snapshot.SectionInfo?.Teacher}'s ${snapshot.SectionInfo?.SchoolYear} ${snapshot.SectionInfo?.GroupName} ${snapshot.SectionInfo?.Block}`
    );
    indices.push(
      await spider.download(snapshot, {
        include,
        exclude
      })
    );
    Progress.increment();
  }
  Progress.stop();
  const Finish = new Date();

  const index: Archive.Multiple.Data = [];
  for (const fileName of indices) {
    if (fileName) {
      index.push(
        JSON.parse(
          fs
            .readFileSync(
              Output.filePathFromOutputPath(Output.outputPath(), fileName)!
            )
            .toString()
        )
      );
      fs.unlinkSync(
        Output.filePathFromOutputPath(Output.outputPath(), fileName)!
      );
    }
  }
  const indexPath = Output.filePathFromOutputPath(
    Output.outputPath(),
    'index.json'
  );
  await Output.writeJSON(indexPath, index, { overwrite: retry });
  await Output.writeJSON(
    await Output.avoidOverwrite(path.resolve(indexPath, '../metadata.json')),
    {
      snapshotPath,
      Start,
      Finish,
      Elapsed: Finish.getTime() - Start.getTime(),
      serverRequests: RateLimiter.requests(),
      serverRequestsPerSecond: RateLimiter.actual(),
      host,
      include,
      exclude
    }
  );

  if (PuppeteerSession.quit()) {
    await spider.quit();
  }
  spinner.succeed(
    `Snapshot supporting files exported to ${Colors.url(path.dirname(indexPath!))}`
  );
}
