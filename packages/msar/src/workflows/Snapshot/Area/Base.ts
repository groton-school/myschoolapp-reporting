import { Endpoint, api as types } from 'datadirect';
import { PuppeteerSession } from 'datadirect-puppeteer';

export class StudentDataError extends Error {
  public message = 'Student data is not included in this snapshot';
}

export type Options = {
  session?: PuppeteerSession.Authenticated;
  groupId: number;
  payload?: types.datadirect.ContentItem.Payload;
  ignoreErrors?: boolean;
  logRequests?: boolean;
  studentData?: boolean;
};

type Context = {
  groupId: number;
};

export type Snapshot<Data = Endpoint.Response> = (
  options: Options & Context
) => Promise<Data | undefined>;
