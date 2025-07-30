import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Output } from '@msar/output';
import { RateLimiter } from '@msar/rate-limiter';
import PQueue from 'p-queue';
import * as Cache from '../Cache.js';
import * as AuthenticatedFetch from './AuthenticatedFetch.js';
import * as HTTPFetch from './HTTPFetch.js';
import { Strategy } from './Strategy.js';

export type Options = {
  host: string;
};

export class Downloader implements Strategy {
  private _auth?: AuthenticatedFetch.Downloader;
  private get auth() {
    if (!this._auth) {
      this._auth = new AuthenticatedFetch.Downloader({ host: this.host });
    }
    return this._auth;
  }

  private _http?: HTTPFetch.Downloader;
  private get http() {
    if (!this._http) {
      this._http = new HTTPFetch.Downloader();
    }
    return this._http;
  }

  private host: string;
  private queue: PQueue;
  private SchoolId?: number;

  public constructor({ host }: Options) {
    if (!Output.outputPath()) {
      throw new Output.OutputError('Downloader requires outputPath');
    }
    this.host = host;
    this.queue = new PQueue({ concurrency: RateLimiter.concurrency() });
  }

  public async download(original: string, filename?: string) {
    // @ts-expect-error 2346 conflict between DownloadItem and DownloadError
    return await Cache.get(original, async () => {
      let fetchUrl = original;
      if (/^\/*[^\/]+\.myschoolcdn.com\//.test(fetchUrl)) {
        fetchUrl = `https://${fetchUrl.replace(/^\/+/, '')}`;
      } else if (fetchUrl.slice(0, 1) == '/') {
        fetchUrl = `https://${this.host}${fetchUrl}`;
      }
      if (/myschoolcdn\.com\/.+\/video\//.test(fetchUrl)) {
        fetchUrl = fetchUrl.replace(
          /(\/\d+)\/video\/video\d+_(\d+)\.(.+)/,
          '$1/$2/1/video.$3'
        );
      }

      if (/:SchoolId/.test(fetchUrl)) {
        if (!this.SchoolId) {
          this.SchoolId = (
            await DatadirectPuppeteer.api.schoolinfo.schoolparams({
              session: this.auth,
              payload: { all: true },
              logRequests: true
            })
          ).SchoolId;
        }
        fetchUrl = fetchUrl.replace(':SchoolId', `${this.SchoolId}`);
        original = fetchUrl;
      }

      let strategy: Strategy = this.http;
      if (/\/ftpimages\//.test(fetchUrl) || /\/app\//.test(fetchUrl)) {
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
