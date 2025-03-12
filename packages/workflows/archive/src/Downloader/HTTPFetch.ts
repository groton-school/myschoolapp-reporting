import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import { Output } from '@msar/output';
import { RateLimiter } from '@msar/rate-limiter';
import { Workflow } from '@msar/workflow';
import { ReadableStream } from 'node:stream/web';
import {
  ContentDisposition,
  filenameFromDisposition
} from '../filenameFromDisposition.js';
import { Strategy } from './Strategy.js';

export type Options = { outputPath?: string };

export class Downloader implements Strategy {
  private outputPath: string;
  private logRequests: boolean;

  public constructor({ outputPath = Output.outputPath() }: Options = {}) {
    this.outputPath = outputPath;
    this.logRequests = Workflow.logRequests();
  }

  public async download(url: string, filename?: string) {
    Log.debug(`HTTPFetch: ${Colors.url(url)}`);
    const response = await RateLimiter.add(async () => await fetch(url));
    if (!response) {
      throw new Error(`Rate limit returned void: ${Log.syntaxColor({ url })}`);
    }
    if (this.logRequests) {
      Log.debug({
        url,
        response: {
          url: response.url,
          redirected: response.redirected,
          type: response.type,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        }
      });
    }
    if (response.ok && response.body) {
      return {
        localPath: await Output.writeFetchedFile({
          url,
          stream: response.body as ReadableStream,
          outputPath: this.outputPath
        }),
        filename:
          filename ||
          filenameFromDisposition({
            url,
            value: response.headers.get(ContentDisposition) || undefined
          })
      };
    } else {
      return { error: `${response.status}: ${response.statusText}` };
    }
  }
}
