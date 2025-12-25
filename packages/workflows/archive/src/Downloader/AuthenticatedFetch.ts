import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import { Root } from '@qui-cli/root';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Protocol } from 'puppeteer';
import { DownloadData, DownloadError } from '../Cache.js';
import {
  ContentDisposition,
  filenameFromDisposition
} from '../filenameFromDisposition.js';
import { Strategy } from './Strategy.js';

type FilepathVariantsOptions = {
  url: string;
  filename?: string;
  guid: string;
};

export type Options = {
  host: URL | string;
};

const TEMP = path.join('/tmp/msar/download', crypto.randomUUID());
const DOWNLOADS = path.join(os.homedir(), 'Downloads');

export class Downloader
  extends PuppeteerSession.Authenticated
  implements Strategy
{
  private outputPath: string;
  private emitter = new EventEmitter();
  private keepAliveProcess?: NodeJS.Timeout;

  public constructor({ host }: Options) {
    super(`https://${host}`);
    if (!Output.outputPath()) {
      throw new Output.OutputError('AuthenticatedFetch requires outputPath');
    }
    this.outputPath = Output.outputPath();
    this.keepAlive();
  }

  private keepAlive() {
    this.keepAliveProcess = setTimeout(
      () => {
        try {
          this.page.reload();
          this.keepAlive();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          // ignore TargetCloseError
        }
      },
      5 * 60 * 1000
    );
  }

  public async close() {
    if (this.keepAliveProcess) {
      clearTimeout(this.keepAliveProcess);
    }
    await super.close();
  }

  public async download(url: string, filename?: string) {
    Log.debug(`AuthenticatedFetch: ${url}`);
    await this.ready();
    const session = await this.baseFork('about:blank');
    const client = await session.page.createCDPSession();

    await client.send('Fetch.enable', {
      patterns: [
        {
          urlPattern: '*',
          requestStage: 'Response'
        }
      ]
    });

    client.on(
      'Fetch.requestPaused',
      (async (requestPausedEvent: Protocol.Fetch.RequestPausedEvent) => {
        const { requestId } = requestPausedEvent;
        const reqUrl = new URL(requestPausedEvent.request.url);
        const fetchUrl = new URL(url);
        if (reqUrl.pathname === fetchUrl.pathname) {
          filename =
            filename ||
            filenameFromDisposition({
              url,
              value: requestPausedEvent.responseHeaders?.find(
                (header) => header.name === ContentDisposition
              )?.value
            });
          await client.send(
            'Fetch.fulfillRequest',
            this.asAttachment(requestPausedEvent)
          );
        } else {
          await client.send('Fetch.continueRequest', { requestId });
        }
      }).bind(this)
    );

    client.on(
      'Browser.downloadProgress',
      (async (downloadEvent: Protocol.Browser.DownloadProgressEvent) => {
        if (downloadEvent.state === 'completed') {
          const after = fs.readdirSync(DOWNLOADS);
          const possiblePaths = this.filepathVariants({
            url,
            filename,
            guid: downloadEvent.guid
          });

          let localPath = new URL(url).pathname;
          if (localPath == '/app/utilities/FileDownload.ashx') {
            localPath = path.join(path.dirname(localPath), filename!);
          }
          const destFilepath = path.resolve(
            Root.path(),
            Output.filePathFromOutputPath(this.outputPath, localPath)!
          );
          const dir = path.dirname(destFilepath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          try {
            let key: keyof typeof possiblePaths;
            for (key in possiblePaths) {
              if (fs.existsSync(possiblePaths[key])) {
                fs.renameSync(possiblePaths[key], destFilepath);
                Log.debug(
                  `Moved ${key} file ${Colors.path(possiblePaths[key], Colors.value)} to ${Colors.path(localPath, Colors.value)}`
                );
                this.emitter.emit(url, { localPath, filename });
                return;
              }
            }
            const ext = path.extname(localPath);
            const possible = after
              .filter((f) => !f.endsWith('.crdownload') && !f.startsWith('.'))
              .filter((f) => !before.includes(f))
              .filter(
                (f) =>
                  f.endsWith(ext) ||
                  (/\.jpe?g$/i.test(localPath) && /\.jpe?g$/i.test(f))
              );
            if (possible.length === 0) {
              throw new Error(
                'No possible downloads, likely 404 redirect to HTML error page'
              );
            } else if (possible.length == 1) {
              const possiblePath = path.join(DOWNLOADS, possible.shift()!);
              fs.renameSync(possiblePath, destFilepath);
              if (
                filename === path.basename(localPath) &&
                filename !== path.basename(possiblePath)
              ) {
                filename = path
                  .basename(localPath)
                  .replace(/( \(\d+\))(\.[^.]+)$/, '$2');
              }
              this.emitter.emit(url, { localPath, filename });
            } else {
              // TODO reduce copy-pasta in favor of reusable functions
              setTimeout(
                (() => {
                  const next = fs.readdirSync(DOWNLOADS);
                  const lastResort = possible.filter((f) => next.includes(f));
                  if (lastResort.length === 1) {
                    const possiblePath = path.join(
                      DOWNLOADS,
                      lastResort.shift()!
                    );
                    fs.renameSync(possiblePath, destFilepath);
                    if (
                      filename === path.basename(localPath) &&
                      filename !== path.basename(possiblePath)
                    ) {
                      filename = path
                        .basename(localPath)
                        .replace(/( \(\d+\))(\.[^.]+)$/, '$2');
                    }
                    this.emitter.emit(url, { localPath, filename });
                  } else {
                    Log.error(
                      `Could not identify ${Colors.url(url)} download: ${lastResort.map((p) => Colors.value(p)).join(', ')}`
                    );
                    this.emitter.emit(url, { error: lastResort });
                  }
                }).bind(this),
                1000
              );
            }
          } catch (error) {
            Log.error(
              `Download ${Colors.url(url)} failed: ${Colors.error(error)}`
            );
            this.emitter.emit(url, { error });
          }
        }
      }).bind(this)
    );

    client.send('Browser.setDownloadBehavior', {
      behavior: 'allowAndName',
      downloadPath: TEMP,
      eventsEnabled: true
    });

    const before = fs.readdirSync(DOWNLOADS);
    return new Promise<DownloadData | DownloadError>((resolve) => {
      const listener = async (downloadData: DownloadData | DownloadError) => {
        this.emitter.removeListener(url, listener);
        await session.close();
        resolve(downloadData);
      };
      this.emitter.on(url, listener);
      session.goto(url).catch((error) => Log.debug(`Ignored: ${error}`));
    });
  }

  private asAttachment(
    requestPausedEvent: Protocol.Fetch.RequestPausedEvent
  ): Protocol.Fetch.FulfillRequestRequest {
    const responseHeaders = requestPausedEvent.responseHeaders || [];
    const i = responseHeaders.findIndex(
      (header) => header.name.toLowerCase() === ContentDisposition
    );
    const contentDispositionHeader = {
      name: ContentDisposition,
      value:
        i >= 0
          ? responseHeaders[i].value.replace('inline', 'attachment')
          : 'attachment'
    };
    if (i >= 0) {
      responseHeaders[i] = contentDispositionHeader;
    } else {
      responseHeaders.push(contentDispositionHeader);
    }
    return { ...requestPausedEvent, responseHeaders, responseCode: 200 };
  }

  private filepathVariants({ url, filename, guid }: FilepathVariantsOptions) {
    const urlFilename = path.basename(new URL(url).pathname);
    const filenameVariants: Record<string, string> = { urlFilename };
    if (filename) {
      filenameVariants.filename = filename;
      if (filename.trim() !== filename) {
        filenameVariants.trimmed = filename.trim();
      }
    }
    let key: keyof typeof filenameVariants;
    for (key in filenameVariants) {
      if (/\.jpg\s*$/i.test(filenameVariants[key])) {
        filenameVariants[`${key}.jpeg`] = filenameVariants[key].replace(
          /\.jpg(\s*)$/i,
          '.jpeg$1'
        );
      }
      if (/\?+/.test(filenameVariants[key])) {
        filenameVariants[`${key} Unicode encoding error`] = filenameVariants[
          key
        ].replace(/\?/g, '_');
      }
    }
    const dirVariants: Record<string, string> = {
      tmp: path.join(TEMP, guid)
    };
    for (key in filenameVariants) {
      dirVariants[`download ${key}`] = path.join(
        DOWNLOADS,
        filenameVariants[key]
      );
    }
    return dirVariants;
  }
}
