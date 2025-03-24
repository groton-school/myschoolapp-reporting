import { PuppeteerSession } from '@msar/puppeteer-session';
import { Endpoint, api } from 'datadirect';

export class StudentDataError extends Error {
  public message = 'Student data is not included in this snapshot';
}

export type Options = {
  session?: PuppeteerSession.Authenticated;
  groupId: number;
  payload?: api.datadirect.ContentItem.Payload;
  ignoreErrors?: boolean;
  logRequests?: boolean;
  studentData?: boolean;
};

type Context = {
  groupId: number;
};

export type Snapshot<Data = Endpoint.Response> = (
  options: Options & Context,
  prev?: Data
) => Promise<Data | undefined>;
