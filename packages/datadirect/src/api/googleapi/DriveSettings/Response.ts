import { DateTimeString } from '@battis/descriptive-types';

export type Response = {
  VendorId: number;
  IntegrationType: number;
  Name: string;
  EnabledInd: boolean;
  ClientId: string;
  ClientSecret: string;
  /** n/j/Y g:i A */
  AccessTokenExpUtc: DateTimeString;
  ApiKey: string;
  AuthUrl: string;
  Message: string;
  Status: number;
  SchoolId: number;
  UserId: number;
};
