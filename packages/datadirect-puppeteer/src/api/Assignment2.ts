import {
  AssignmentCenterCourseListGet as A,
  SecureGet as S,
  UserAssignmentDetailsGetAllData as U
} from 'datadirect/dist/api/Assignment2.js';
import { fetchViaPuppeteer } from './fetchViaPuppeteer.js';

export const AssignmentCenterCourseListGet = fetchViaPuppeteer<
  A.Payload,
  A.Response
>(A);

export const SecureGet = fetchViaPuppeteer<S.Payload, S.Response>(S);

export const UserAssignmentDetailsGetAllData = fetchViaPuppeteer<
  U.Payload,
  U.Response
>(U);
