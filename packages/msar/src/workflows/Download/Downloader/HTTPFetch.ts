import cli from '@battis/qui-cli';
import { ReadableStream } from 'node:stream/web';
import * as common from '../../../common.js';
import {
  ContentDisposition,
  filenameFromDisposition
} from '../filenameFromDisposition.js';
import { Strategy } from './Strategy.js';

export type Options = { outputPath: string } & common.Workflow.Args.Parsed;

export class Downloader implements Strategy {
  private outputPath: string;
  private logRequests: boolean;

  public constructor({ outputPath, logRequests }: Options) {
    this.outputPath = outputPath;
    this.logRequests = logRequests;
  }

  public async download(url: string, filename?: string) {
    cli.log.debug(`HTTPFetch: ${cli.colors.url(url)}`);
    const response = await fetch(url);
    if (this.logRequests) {
      cli.log.debug({
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
        localPath: await common.Output.writeFetchedFile({
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
