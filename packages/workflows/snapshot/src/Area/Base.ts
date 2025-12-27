import { PuppeteerSession } from '@msar/puppeteer-session';
import { Endpoints } from 'datadirect';

export class StudentDataError extends Error {
  public message = 'Student data is not included in this snapshot';
}

export type Options = {
  session?: PuppeteerSession.Authenticated;
  groupId: number;
  payload?: Endpoints.API.DataDirect.ContentItem.Payload;
  ignoreErrors?: boolean;
  logRequests?: boolean;
  studentData?: boolean;
};

type Context = {
  groupId: number;
};

export type Snapshot<Data = Endpoints.Endpoint.Response> = (
  options: Options & Context
) => Promise<Data | undefined>;
