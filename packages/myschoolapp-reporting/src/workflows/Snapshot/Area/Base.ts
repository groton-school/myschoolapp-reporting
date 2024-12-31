import { Endpoint, api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';

export class StudentDataError extends Error {
  public message = 'Student data is not included in this snapshot';
}

export type Options = {
  payload?: types.datadirect.ContentItem.Payload;
  ignoreErrors?: boolean;
  studentData?: boolean;
};

type Context = {
  api: api;
  groupId: number;
};

export type Snapshot<Data = Endpoint.Response> = (
  options: Options & Context
) => Promise<Data | undefined>;
