import { Output } from '@msar/output';
import { RateLimiter } from '@msar/rate-limiter';
import * as Archive from '@msar/types.archive';
import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import { Progress } from '@qui-cli/progress';
import { Root } from '@qui-cli/root';
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

const SNAPSHOT_PATH = 'snapshotPath';

export const name = '@msar/download';

let include = [/^\/.*/];
let exclude = [/^https?:/];
let snapshotPath: string | undefined = undefined;
let retry = false;

export function configure(config: Configuration = {}) {
  // @ts-expect-error 2345 Plugin.hydrate typing is too narrow
  const _include = Plugin.hydrate(config.include, include);
  // @ts-expect-error 2345 Plugin.hydrate typing is too narrow
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
  // @ts-expect-error 2345 Plugin.hydrate typing is too narrow
  retry = Plugin.hydrate(config.retry, retry);
}

export function options(): Plugin.Options {
  Positionals.require({
    [SNAPSHOT_PATH]: { description: `Path to an existing snapshot file` }
  });
  Positionals.allowOnlyNamedArgs();
  return {
    man: [
      { level: 1, text: 'Archive options' },
      {
        text: `Download the supporting files for an existing snapshot JSON file. This command requires a path to an existing snapshot file (${Colors.positionalArg(SNAPSHOT_PATH)}).`
      }
    ],

    flag: {
      retry: {
        description: `Retry a previously started archive process. ${Colors.positionalArg(SNAPSHOT_PATH)} must be the path to an existing archive index.json file.`
      }
    },
    opt: {
      include: {
        description: `Comma-separated list of regular expressions to match URLs to be included in download`,
        hint: Colors.quotedValue('"^\\/,example\\.com"'),
        default: include.join(',').slice(1, -1)
      },
      exclude: {
        description: `Comma-separated list of regular expressions to match URLs to exclude from download`,
        hint: Colors.quotedValue('"example\\.com,foo\\..+\\.com"'),
        default: exclude.join(',').slice(1, -1)
      }
    }
  };
}

function stringToRegExpArray(arg?: string): RegExp[] | undefined {
  return arg && arg !== ''
    ? arg.split(',').map((exp) => new RegExp(exp))
    : undefined;
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  const snapshotPath = Positionals.get(SNAPSHOT_PATH);
  include = Plugin.hydrate(stringToRegExpArray(values.include), include);
  exclude = Plugin.hydrate(stringToRegExpArray(values.exclude), exclude);
  configure({ ...values, include, exclude, snapshotPath });
}

export async function run() {
  try {
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
      `Read ${snapshots.length} snapshots from ${Colors.path(snapshotPath, Colors.value)}`
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
        `Downloading ${snapshot.SectionInfo?.Block} ${snapshot.SectionInfo?.GroupName} (${snapshot.SectionInfo?.Teacher} ${snapshot.SectionInfo?.SchoolYear})`
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

    await spider.quit();
    spinner.succeed(
      `Snapshot supporting files exported to ${Colors.path(path.dirname(indexPath!))}`
    );
  } catch (error) {
    Log.error({ error });
  }
}
