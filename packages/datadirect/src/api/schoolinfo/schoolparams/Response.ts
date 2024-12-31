import {
  DateTimeString,
  EmailString,
  NumericBoolean,
  NumericString,
  URLString
} from '@battis/descriptive-types';

export type Response = {
  SchoolId: number;
  SchoolName: string;
  HoursFromServer: number;
  AppLocaleId: number;
  LocaleId: number;
  Timezone: string;
  DatabaseTimezone: string;
  LiveUrl: URLString;
  Username: string;
  PortalMyBeforeSchool: boolean;
  PortalDisplayLabel: string;
  MailboxName: EmailString;
  HelplinkText: string;
  SignInOption: number;
  LocalDateTime: DateTimeString;
  ServerDateTime: DateTimeString;
  IndividualMessageEnabled: boolean;
  BulkMessageEnabled: boolean;
  BulkEmailEnabled: boolean;
  HasPodiumSite: boolean;
  PodiumFrontendStatus: 2;
  NameFormat: string;
  ShowFeaturedContent: NumericBoolean;
  ShowRecentActivity: NumericBoolean;
  ShowScoreboard: NumericBoolean;
  ShowArchivedContent: NumericBoolean;
  AppCultureName: string;
  CultureName: string;
  EncCookieSiteUrl: string;
  ShowAttendance: NumericBoolean;
  BBSiteID: NumericString;
  AllowRubricBankAdd: boolean;
  IsSmallCollege: boolean;
  MobileSiteInd: boolean;
  SSLInd: boolean;
  LoginRedirectInd: boolean;
  LoginNameLabel: string;
  DbNum: number;
  DbDate: DateTimeString;
  TestSchool: boolean;
};
