import { Output } from '@msar/output';
import { RateLimiter } from '@msar/rate-limiter';
import PQueue from 'p-queue';
import * as Cache from './Cache.js';
import * as AuthenticatedFetch from './Downloader/AuthenticatedFetch.js';
import * as HTTPFetch from './Downloader/HTTPFetch.js';
import { Strategy } from './Downloader/Strategy.js';

export type Options = {
  host: string;
};

export class Downloader implements Strategy {
  private auth: AuthenticatedFetch.Downloader;
  private http: HTTPFetch.Downloader;
  private host: string;
  private queue: PQueue;

  public constructor({ host }: Options) {
    if (!Output.outputPath()) {
      throw new Output.OutputError('Downloader requires outputPath');
    }
    this.host = host;
    this.queue = new PQueue({ concurrency: RateLimiter.concurrency() });
    this.auth = new AuthenticatedFetch.Downloader({
      host
    });
    this.http = new HTTPFetch.Downloader();
  }

  public async download(original: string, filename?: string) {
    // TODO Cache.Item typing
    // @ts-expect-error 2346 conflict between DownloadItem and DownloadError
    return await Cache.get(original, async () => {
      let fetchUrl = original;
      if (fetchUrl.slice(0, 2) == '//') {
        fetchUrl = `https:${fetchUrl}`;
      } else if (fetchUrl.slice(0, 1) == '/') {
        fetchUrl = `https://${this.host}${fetchUrl}`;
      }
      if (/myschoolcdn\.com\/.+\/video\//.test(fetchUrl)) {
        fetchUrl = fetchUrl.replace(
          /(\/\d+)\/video\/video\d+_(\d+)\.(.+)/,
          '$1/$2/1/video.$3'
        );
      }
      let strategy: Strategy = this.http;
      if (/ftpimages/.test(fetchUrl)) {
        strategy = this.auth;
      }
      return {
        original,
        accessed: new Date(),
        ...(await this.queue.add(() => strategy.download(fetchUrl, filename)))
      };
    });
  }

  public async quit() {
    await this.auth.close();
  }
}
