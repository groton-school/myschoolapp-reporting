import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import { Debug } from '@msar/debug';
import { Output } from '@msar/output';
import * as Archive from '@msar/types.archive';
import { Workflow } from '@msar/workflow';
import path from 'node:path';
import * as Cache from './Cache.js';
import * as Downloader from './Downloader.js';

export type Options = {
  include?: RegExp[];
  exclude?: RegExp[];
};

type TraverseOptions = Options & {
  host: string;
  pathToComponent: string;
};

export class Spider {
  private downloader: Downloader.Downloader;

  public constructor(options: Downloader.Options) {
    this.downloader = new Downloader.Downloader(options);
  }

  public async download(snapshot: Archive.Data, { ...options }: Options) {
    if (!Output.outputPath()) {
      throw new Output.OutputError('Spider requires outputPath');
    }
    if (snapshot) {
      Debug.withGroupId(
        snapshot.SectionInfo?.Id || Colors.error('unknown'),
        'Downloading supporting files'
      );
      await this.traverse(snapshot, {
        host: snapshot.Metadata.Host,
        ...options,
        pathToComponent: path.basename(Output.outputPath())
      });
      const indexName = `${snapshot.SectionInfo?.Id || 'index'}.json`;
      await Output.writeJSON(
        await Output.avoidOverwrite(path.join(Output.outputPath(), indexName)),
        snapshot,
        { silent: true }
      );
      Debug.withGroupId(
        snapshot.SectionInfo?.Id || Colors.error('unknown'),
        `Supporting files exported to ${Colors.url(Output.outputPath())}/${Colors.value(indexName)}`
      );
      return indexName;
    } else {
      Log.warning('Could not downlod course content (no index available)');
      return undefined;
    }
  }

  private async traverse(
    snapshotComponent: object,
    { pathToComponent, ...options }: TraverseOptions
  ) {
    const { include, exclude } = options;
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
          } else if (
            key === 'PhotoFilename' ||
            key === 'ThumbFilename' ||
            key === 'AttachmentQueryString' ||
            /Url$/i.test(key) ||
            (/FilePath$/i.test(key) &&
              'FileName' in snapshotComponent &&
              typeof snapshotComponent.FileName === 'string')
          ) {
            if (snapshotComponent[key]) {
              let url: string = snapshotComponent[key];
              if (
                key === 'ThumbFilename' &&
                /^thumb_topic[a-z0-9_.]/i.test(url)
              ) {
                url = `/ftpimages/:SchoolId/topics/${url}`;
              } else if (
                key === 'PhotoFilename' &&
                /^thumb_user[a-z0-9_.]/i.test(url)
              ) {
                url = `/ftpimages/:SchoolId/user/${url}`;
              } else if (key === 'AttachmentQueryString') {
                url = `/app/utilities/FileDownload.ashx?${snapshotComponent[key]}`;
              } else if (
                /FilePath$/i.test(key) &&
                'FileName' in snapshotComponent &&
                typeof snapshotComponent.FileName === 'string'
              ) {
                url = path.join(
                  snapshotComponent[key],
                  snapshotComponent.FileName
                );
              }
              if (
                (!include ||
                  include.reduce(
                    (included, regex) => included || regex.test(url),
                    false
                  )) &&
                (!exclude ||
                  exclude.reduce(
                    (excluded, regex) => excluded && !regex.test(url),
                    true
                  ))
              ) {
                Log.debug({ pathToComponent, key, url });

                try {
                  const item = await this.downloader.download(
                    url,
                    'FriendlyFileName' in snapshotComponent &&
                      typeof snapshotComponent['FriendlyFileName'] === 'string'
                      ? snapshotComponent['FriendlyFileName']
                      : 'Attachment' in snapshotComponent &&
                          typeof snapshotComponent['Attachment'] === 'string'
                        ? snapshotComponent['Attachment']
                        : undefined
                  );
                  (snapshotComponent[key] as Archive.Annotation) = item;
                  Log.debug(
                    `${pathToComponent}[${key}]: ${item.localPath || item.error}`
                  );
                } catch (error) {
                  if (Workflow.ignoreErrors()) {
                    const message = `Download ${Colors.value(key)} ${Colors.url(
                      snapshotComponent[key]
                    )} failed: ${error}`;
                    Log.error(message);
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
          }
        })
      );
    }
  }

  public async quit() {
    await this.downloader.quit();
  }
}
