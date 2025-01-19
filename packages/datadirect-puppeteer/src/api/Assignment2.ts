import {
  AssignmentCenterCourseListGet as A,
  crud as C,
  List as L,
  AssignmentPreference as P,
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

export const AssignmentPreference: Fetchable.Binding<P.Payload, P.Response> =
  Fetchable.bind(P);

export const crud: Fetchable.Binding<C.Payload, C.Response> = Fetchable.bind(C);

export const List: Fetchable.Binding<L.Payload, L.Response> = Fetchable.bind(L);
