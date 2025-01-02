import cli from '@battis/qui-cli';
import { Mutex } from 'async-mutex';
import { PuppeteerSession } from 'datadirect-puppeteer';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Protocol } from 'puppeteer';
import * as common from '../../../common.js';
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
  outputPath: string;
  host: string;
} & PuppeteerSession.Options;

const TEMP = path.join('/tmp/msar/download', crypto.randomUUID());
const DOWNLOADS = path.join(os.homedir(), 'Downloads');

export class AuthenticatedFetch
  extends PuppeteerSession.Authenticated
  implements Strategy
{
  private outputPath: string;
  private preparing = new Mutex();
  private emitter = new EventEmitter();

  public constructor({ outputPath, host, ...options }: Options) {
    super(host, options);
    this.outputPath = outputPath;
  }

  public async download(url: string, filename?: string) {
    /*
     * FIXME refactoring broke `msar download`
     *   ```sh
     *   - Connecting to /path/to/myschoolapp-reporting/var/download.log
     *   ✔ Logging level all to /path/to/myschoolapp-reporting/var/download.log
     *   - Reading snaphot file
     *   ✔ Read 1 snapshots from /path/to/myschoolapp-reporting/var/2024 - 2025 - Horace Bixby - Sandbox (Y) - 97551579.json
     *   Group 97551579: Downloading supporting files
     *   Task Terminated with exit code 1
     *   node:internal/url:806
     *       const href = bindingUrl.parse(input, base, raiseException);
     *                               ^
     *   TypeError: Invalid URL
     *       at new URL (node:internal/url:806:29)
     *       at AuthenticatedFetch.openURL (file:///path/to/myschoolapp-reporting/packages/datadirect-puppeteer/dist/PuppeteerSession/Base.js:45:25) {
     *     code: 'ERR_INVALID_URL',
     *     input: 'example.myschoolapp.com'
     *   }
     *   ```
     */
    const session = await this.fork('about:blank');
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

          const localPath = new URL(url).pathname;
          const destFilepath = path.resolve(
            process.cwd(),
            common.output.filePathFromOutputPath(this.outputPath, localPath)!
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
                cli.log.debug(
                  `Moved ${key} file to ${cli.colors.url(localPath)}`
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
                    cli.log.error(
                      `Could not identify ${cli.colors.url(url)} download: ${lastResort.map((p) => cli.colors.value(p)).join(', ')}`
                    );
                    this.emitter.emit(url, { error: lastResort });
                  }
                }).bind(this),
                1000
              );
            }
          } catch (error) {
            cli.log.error(
              `Download ${cli.colors.url(url)} failed: ${cli.colors.error(error)}`
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
      session.goto(url).catch((error) => cli.log.debug(`Ignored: ${error}`));
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
