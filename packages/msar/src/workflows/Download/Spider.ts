import cli from '@battis/qui-cli';
import path from 'node:path';
import * as common from '../../common.js';
import * as Snapshot from '../Snapshot.js';
import * as Cache from './Cache.js';
import * as Downloader from './Downloader.js';

export type Options = {
  include?: RegExp[];
  exclude?: RegExp[];
} & common.Args.Parsed;

type TraverseOptions = Options & {
  host: string;
  pathToComponent: string;
};

export class Spider {
  private downloader: Downloader.Downloader;

  public constructor(options: Downloader.Options) {
    this.downloader = new Downloader.Downloader(options);
  }

  public async download(
    snapshot: Snapshot.Single.Data,
    { outputOptions, ...options }: Options
  ) {
    const { outputPath, pretty } = outputOptions;
    if (!outputPath) {
      throw new common.Output.OutputError('Spider requires outputPath');
    }
    if (snapshot) {
      common.Debug.withGroupId(
        snapshot.SectionInfo?.Id || cli.colors.error('unknown'),
        'Downloading supporting files'
      );
      await this.traverse(snapshot, {
        host: snapshot.Metadata.Host,
        outputOptions,
        ...options,
        pathToComponent: path.basename(outputPath)
      });
      const indexName = `${snapshot.SectionInfo?.Id || 'index'}.json`;
      await common.Output.writeJSON(
        await common.Output.avoidOverwrite(path.join(outputPath, indexName)),
        snapshot,
        {
          pretty
        }
      );
      common.Debug.withGroupId(
        snapshot.SectionInfo?.Id || cli.colors.error('unknown'),
        `Supporting files exported to ${cli.colors.url(outputPath)}/${cli.colors.value(indexName)}`
      );
      return indexName;
    } else {
      cli.log.warning('Could not downlod course content (no index available)');
      return undefined;
    }
  }

  private async traverse(
    snapshotComponent: object,
    { pathToComponent, ...options }: TraverseOptions
  ) {
    const { include, exclude, ignoreErrors } = options;
    if (Array.isArray(snapshotComponent)) {
      await Promise.allSettled(
        snapshotComponent.map(async (elt, i) => {
          await this.traverse(elt, {
            pathToComponent: `${pathToComponent}[${i}]`,
            ...options
          });
        })
      );
    } else {
      await Promise.allSettled(
        (
          Object.keys(snapshotComponent) as (keyof typeof snapshotComponent)[]
        ).map(async (key: keyof typeof snapshotComponent) => {
          // TODO ideally catch null case before recursive invocation
          if (snapshotComponent[key] === null) {
            return;
          } else if (typeof snapshotComponent[key] === 'object') {
            await this.traverse(snapshotComponent[key], {
              pathToComponent: `${pathToComponent}.${key}`,
              ...options
            });
            /*
             * FIXME FileName files in topics are at /ftpimages/:SchoolId/topics/:FileName
             *   :SchoolId can be determined by calling `/api/schoolinfo/schoolparams`
             */
          } else if (
            /Url$/i.test(key) ||
            (/FilePath$/i.test(key) &&
              !(snapshotComponent[key] as string).endsWith('/'))
          ) {
            if (
              snapshotComponent[key] &&
              (!include ||
                include.reduce(
                  (included, regex) =>
                    included || regex.test(snapshotComponent[key]),
                  false
                )) &&
              (!exclude ||
                exclude.reduce(
                  (excluded, regex) =>
                    excluded && !regex.test(snapshotComponent[key]),
                  true
                ))
            ) {
              try {
                const item = await this.downloader.download(
                  snapshotComponent[key],
                  'FriendlyFileName' in snapshotComponent &&
                    typeof snapshotComponent['FriendlyFileName'] === 'string'
                    ? snapshotComponent['FriendlyFileName']
                    : undefined
                );
                (snapshotComponent[key] as Cache.Item) = item;
                cli.log.debug(
                  `${pathToComponent}[${key}]: ${item.localPath || item.error}`
                );
              } catch (error) {
                if (ignoreErrors) {
                  const message = `Download ${cli.colors.value(key)} ${cli.colors.url(
                    snapshotComponent[key]
                  )} failed: ${error}`;
                  cli.log.error(message);
                  (snapshotComponent[key] as Cache.Item) = {
                    original: snapshotComponent[key],
                    accessed: new Date(),
                    error: message
                  };
                } else {
                  throw error;
                }
              }
            }
          }
        })
      );
    }
  }

  public async quit() {
    await this.downloader.quit();
  }
}
