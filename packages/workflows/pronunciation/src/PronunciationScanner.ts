import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { Workflow } from '@msar/workflow';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import { Progress } from '@qui-cli/progress';
import { stringify } from 'csv';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Handler, HTTPRequest, HTTPResponse } from 'puppeteer';

type ScanOptions = {
  data: Record<string, string | number>[];
  columns: string[];
  column: string;
  download?: boolean;
};

const PronunciationColumns = {
  Recorded: 'Recorded',
  FilePath: 'File Path',
  Downloaded: 'Downloaded'
};

export class PronunciationScanner {
  private recordingPath?: string;
  private column?: string;
  private download?: boolean;

  public constructor(private root: PuppeteerSession.Authenticated) {}

  public async scan({ data, columns, column, download = false }: ScanOptions) {
    this.column = column;
    this.download = download;
    await this.prepareRecordingDownloadDir(download);
    columns.push(...Object.values(PronunciationColumns));
    Progress.start({ max: data.length });
    for (const row of data) {
      await this.scanRow(row);
      Progress.increment();
    }
    await this.root.close();
    const indexPath = await Output.avoidOverwrite(
      Output.filePathFromOutputPath(Output.outputPath(), 'pronunciations.csv')
    );
    await fs.writeFile(indexPath, stringify(data, { header: true, columns }));
    Progress.stop();
    Log.info(`Index written to ${Colors.url(indexPath)}`);
    return data;
  }

  private async prepareRecordingDownloadDir(download: boolean) {
    if (download) {
      this.recordingPath = await Output.avoidOverwrite(
        Output.filePathFromOutputPath(Output.outputPath(), 'recordings')
      );
      if (!existsSync(this.recordingPath)) {
        await fs.mkdir(this.recordingPath, { recursive: true });
      }
      Log.info(
        `Recordings will be downloaded to ${Colors.url(this.recordingPath)}`
      );
    }
  }

  private async scanRow(row: Record<string, string | number>) {
    const session = await this.root.fork(this.root.page.url());
    await new Promise<void>((resolve, reject) => {
      if (!this.column) {
        throw new Error();
      }
      try {
        let sas_url: string | undefined = undefined;
        let delayed = false;

        // FIXME race condition between URL and blob requests
        const requestHandler: Handler<HTTPRequest> = async (request) => {
          const poll = () => {
            if (
              !sas_url &&
              request.resourceType() === 'xhr' &&
              /* TODO probably not a durable test
               *
               * At the moment, empirically, the request to download the name
               * pronunciation recordings is the only one from the contact
               * card page that inludes this pattern.
               */
              /app.blackbaud.net\/files/.test(request.url())
            ) {
              if (!delayed && Workflow.logRequests()) {
                delayed = true;
                Log.debug({
                  step: 'delaying request for sas_url until listener ready',
                  user_id: row[this.column!],
                  sas_url: request.url()
                });
              }
              setTimeout(poll, 100);
            } else {
              if (
                delayed &&
                request.url() === sas_url &&
                Workflow.logRequests()
              ) {
                Log.debug({
                  step: 'releasing request for sas_url',
                  user_id: row[this.column!],
                  sas_url
                });
              }
              request.continue();
            }
          };
          poll();
        };

        const responseHandler: Handler<HTTPResponse> = async (response) => {
          const request = response.request();
          if (request.resourceType() === 'xhr') {
            if (request.url() === sas_url) {
              await this.saveRecording(row, response);
              resolve();
            } else if (
              /\/namep\/v1\/usernamepronunciation\/\d+\?addin=1$/.test(
                request.url()
              )
            ) {
              sas_url = await this.getRecordingUrl(response, row);
              row[PronunciationColumns.Recorded] = (
                sas_url !== undefined
              ).toString();
              if (sas_url && this.download) {
                this.startRecordingDownload(session);
                if (Workflow.logRequests()) {
                  Log.debug({
                    step: 'interactive request sent',
                    user_id: row[this.column!],
                    sas_url
                  });
                }
              } else {
                resolve();
              }
            }
          }
        };

        session.page.setRequestInterception(true);
        session.page.on('request', requestHandler);
        session.page.on('response', responseHandler);
        session.goto(
          new URL(
            `/app/core?svcid=edu#userprofile/${row[this.column]}/contactcard`,
            this.root.page.url()
          )
        );
      } catch (e) {
        if (Workflow.ignoreErrors()) {
          const error = e as Error;
          Log.warning(
            `Ignored error scanning user ${Colors.value(row[this.column])}: ${Colors.error(error.message)}`
          );
          resolve();
        } else {
          reject(e);
        }
      }
    });
    session.close();
  }

  async startRecordingDownload(session: PuppeteerSession.Authenticated) {
    await session.page.waitForNetworkIdle();
    const iframe = await session.page.waitForSelector(
      'iframe[title="Name Pronunciation"]'
    );
    const content = await iframe?.contentFrame();
    const app = await content?.waitForSelector(
      'app-name-pronunciation:has([data-sky-icon="play-circle"])'
    );
    await app?.$eval('button', (button) => button.click());
  }

  private async getRecordingUrl(
    response: HTTPResponse,
    row: Record<string, string | number>
  ) {
    try {
      const data = await response.json();
      if (data.file_exists) {
        row[PronunciationColumns.Recorded] = 'Yes';
        return data.sas_url;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // ignore JSON parse error
    }
    return undefined;
  }

  private async saveRecording(
    row: Record<string, string | number>,
    response: HTTPResponse
  ) {
    if (!this.recordingPath || !this.column) {
      throw new Error();
    }
    const filePath = path.resolve(
      this.recordingPath,
      `${row[this.column]}.mp3`
    );
    await fs.writeFile(filePath, await response.buffer());
    row[PronunciationColumns.FilePath] = path.relative(
      Output.outputPath(),
      filePath
    );
    row[PronunciationColumns.Downloaded] = new Date().toISOString();
    if (Workflow.logRequests()) {
      Log.debug({
        step: 'sas_url downloaded',
        user_id: row[this.column!],
        sas_url: response.url()
      });
    }
  }
}
