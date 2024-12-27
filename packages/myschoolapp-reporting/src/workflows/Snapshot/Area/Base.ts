import { api as types } from 'datadirect';
import { Page } from 'puppeteer';

export type Error = { error: string };

export const StudentDataError =
  'Content containing student data has been excluded from this snapshot';

export type Options = {
  page: Page;
  groupId: number;
  payload?: types.datadirect.ContentItem.Payload;
  ignoreErrors?: boolean;
  studentData?: boolean;
};

export type Snapshot<Data = types.Endpoint.Response> = (
  options: Options
) => Promise<Data | undefined>;
