import {
  AssignmentCenterCourseListGet as A,
  SecureGet as S,
  UserAssignmentDetailsGetAllData as U
} from 'datadirect/dist/api/Assignment2.js';
import { Page } from 'puppeteer';
import * as PuppeteerSession from '../PuppeteerSession.js';

export class Assignment2 extends PuppeteerSession.Fetchable {
  public AssignmentCenterCourseListGet: PuppeteerSession.BoundEndpoint<
    A.Payload,
    A.Response
  >;
  public SecureGet: PuppeteerSession.BoundEndpoint<S.Payload, S.Response>;
  public UserAssignmentDetailsGetAllData: PuppeteerSession.BoundEndpoint<
    U.Payload,
    U.Response
  >;

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);

    this.AssignmentCenterCourseListGet = this.bindEndpoint(A);
    this.SecureGet = this.bindEndpoint(S);
    this.UserAssignmentDetailsGetAllData = this.bindEndpoint(U);
  }
}
