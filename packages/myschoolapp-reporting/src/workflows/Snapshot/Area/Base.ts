import { api as types } from 'datadirect';
import { Page } from 'puppeteer';

export class StudentDataError extends Error {
  public message = 'Student data is not included in this snapshot';
}

export type Options = {
  payload?: types.datadirect.ContentItem.Payload;
  ignoreErrors?: boolean;
  studentData?: boolean;
};

type Context = {
  page: Page;
  groupId: number;
};

export type Snapshot<Data = types.Endpoint.Response> = (
  options: Options & Context
) => Promise<Data | undefined>;
