import { Endpoint, api as types } from 'datadirect';

export class StudentDataError extends Error {
  public message = 'Student data is not included in this snapshot';
}

/*
 * FIXME add session to Area.Base.Options
 *   Should be able to invoke endpoints on specific session
 */
export type Options = {
  groupId: number;
  payload?: types.datadirect.ContentItem.Payload;
  ignoreErrors?: boolean;
  studentData?: boolean;
};

type Context = {
  groupId: number;
};

export type Snapshot<Data = Endpoint.Response> = (
  options: Options & Context
) => Promise<Data | undefined>;
