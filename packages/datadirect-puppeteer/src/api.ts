import { Mutex, MutexInterface } from 'async-mutex';
import { Page } from 'puppeteer';
import * as PuppeteerSession from './PuppeteerSession.js';
import { Assignment2 } from './api/Assignment2.js';
import { LtiTool } from './api/LtiTool.js';
import { assessment } from './api/assessment.js';
import { datadirect } from './api/datadirect.js';
import { gradebook } from './api/gradebook.js';
import { schoolinfo } from './api/schoolinfo.js';
import { topic } from './api/topic.js';

export class api extends PuppeteerSession.Fetchable {
  private preparing = new Mutex();
  private releaseApi?: MutexInterface.Releaser;

  private _assessment?: assessment;
  public get assessment() {
    if (!this._assessment) {
      throw new PuppeteerSession.InitializationError('assessment');
    }
    return this._assessment;
  }

  private _datadirect?: datadirect;
  public get datadirect() {
    if (!this._datadirect) {
      throw new PuppeteerSession.InitializationError('datadirect');
    }
    return this._datadirect;
  }

  private _Assignment2?: Assignment2;
  public get Assignment2() {
    if (!this._Assignment2) {
      throw new PuppeteerSession.InitializationError('Assignment2');
    }
    return this._Assignment2;
  }

  private _LtiTool?: LtiTool;
  public get LtiTool() {
    if (!this._LtiTool) {
      throw new PuppeteerSession.InitializationError('LtiTool');
    }
    return this._LtiTool;
  }

  private _gradebook?: gradebook;
  public get gradebook() {
    if (!this._gradebook) {
      throw new PuppeteerSession.InitializationError('gradebook');
    }
    return this._gradebook;
  }

  private _schoolinfo?: schoolinfo;
  public get schoolinfo() {
    if (!this._schoolinfo) {
      throw new PuppeteerSession.InitializationError();
    }
    return this._schoolinfo;
  }

  private _topic?: topic;
  public get topic() {
    if (!this._topic) {
      throw new PuppeteerSession.InitializationError('topic');
    }
    return this._topic;
  }

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);
    this.preparing.acquire().then((release) => {
      this.releaseApi = release;
      this.prepare();
    });
  }

  public async prepare() {
    await super.ready();
    this._assessment = new assessment(this.page);
    this._datadirect = new datadirect(this.page);
    this._Assignment2 = new Assignment2(this.page);
    this._LtiTool = new LtiTool(this.page);
    this._gradebook = new gradebook(this.page);
    this._schoolinfo = new schoolinfo(this.page);
    this._topic = new topic(this.page);

    if (this.releaseApi) {
      this.releaseApi();
      this.releaseApi = undefined;
    }
  }

  public async ready() {
    await super.ready();
    (await this.preparing.acquire())();
    return this;
  }

  public async fork(path: string | URL, timeout?: number): Promise<api> {
    await this.ready();
    const fork = await super.fork(path, timeout);
    const page = fork.page;
    return await new api(page).ready();
  }
}
