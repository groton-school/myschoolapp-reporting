import * as common from '../../common.js';
import * as Cache from './Cache.js';
import * as AuthenticatedFetch from './Downloader/AuthenticatedFetch.js';
import * as HTTPFetch from './Downloader/HTTPFetch.js';
import { Strategy } from './Downloader/Strategy.js';

export type Options = {
  host: string;
} & common.output.args.Parsed &
  common.PuppeteerSession.args.Parsed &
  common.workflow.args.Parsed;

// TODO Downloader needs to honor --concurrentThreads
export class Downloader implements Strategy {
  private auth: AuthenticatedFetch.Downloader;
  private http: HTTPFetch.Downloader;
  private host: string;

  public constructor({ host, outputOptions, ...options }: Options) {
    const { outputPath } = outputOptions;
    if (!outputPath) {
      throw new common.output.OutputError('Downloader requires outputPath');
    }
    this.host = host;
    this.auth = new AuthenticatedFetch.Downloader({
      host,
      outputOptions,
      ...options
    });
    this.http = new HTTPFetch.Downloader({ outputPath, ...options });
  }

  public async download(original: string, filename?: string) {
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
        ...(await strategy.download(fetchUrl, filename))
      };
    });
  }

  public async quit() {
    await this.auth.close();
  }
}
