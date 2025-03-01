import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  AssignmentCenterCourseListGet as A,
  crud as C,
  List as L,
  AssignmentPreference as P,
  SecureGet as S,
  UserAssignmentDetailsGetAllData as U
} from 'datadirect/dist/api/Assignment2.js';

export const AssignmentCenterCourseListGet: PuppeteerSession.Fetchable.Binding<
  A.Payload,
  A.Response
> = PuppeteerSession.Fetchable.bind(A);

export const SecureGet: PuppeteerSession.Fetchable.Binding<
  S.Payload,
  S.Response
> = PuppeteerSession.Fetchable.bind(S);

export const UserAssignmentDetailsGetAllData: PuppeteerSession.Fetchable.Binding<
  U.Payload,
  U.Response
> = PuppeteerSession.Fetchable.bind(U);

export const AssignmentPreference: PuppeteerSession.Fetchable.Binding<
  P.Payload,
  P.Response
> = PuppeteerSession.Fetchable.bind(P);

export const crud: PuppeteerSession.Fetchable.Binding<C.Payload, C.Response> =
  PuppeteerSession.Fetchable.bind(C);

export const List: PuppeteerSession.Fetchable.Binding<L.Payload, L.Response> =
  PuppeteerSession.Fetchable.bind(L);
