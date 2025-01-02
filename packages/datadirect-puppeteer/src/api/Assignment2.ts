import {
  AssignmentCenterCourseListGet as A,
  SecureGet as S,
  UserAssignmentDetailsGetAllData as U
} from 'datadirect/dist/api/Assignment2.js';
import { Fetchable } from '../PuppeteerSession.js';

export const AssignmentCenterCourseListGet: Fetchable.Binding<
  A.Payload,
  A.Response
> = Fetchable.bind(A);

export const SecureGet: Fetchable.Binding<S.Payload, S.Response> =
  Fetchable.bind(S);

export const UserAssignmentDetailsGetAllData: Fetchable.Binding<
  U.Payload,
  U.Response
> = Fetchable.bind(U);
