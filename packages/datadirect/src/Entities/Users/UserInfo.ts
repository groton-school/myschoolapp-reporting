import {
  DateTimeString,
  EmailString,
  HTMLString,
  NumericString,
  UUIDString
} from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';
import { ProfilePhoto, ProfilePhotoFile } from './ProfilePhoto.js';

// from webapp.context
export type UserInfo = {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: EmailString;
  UserName: EmailString;
  LegacyUserName: string;
  HostId: string;
  Greeting: string;
  MaidenName: string;
  NickName: string;
  PreferredLastName: string;
  Prefix: string;
  Suffix: string;
  MiddleName: string;
  EmailIsBad: boolean;
  OtherLastName: string;
  CcEmail: EmailString;
  CcEmailIsBad: boolean;
  Affiliation: string;
  StudentDisplay: string;
  UserNameFormatted: string;
  InsertBy: string;
  StudentInfo: {
    GradYear: NumericString;
  };
  Citizenship: string;
  PersonalWebsite: string;
  BoardingOrDay: string;
  IsDeceased: boolean;
  LivingStatus: string;
  ScreenName: string;
  IMService: string;
  IsLost: boolean;
  GenderDesc: string;
  Gender: string;
  Pronouns: number;
  BirthDate: DateTimeString;
  PersonalBio: string;
  MiscBio: HTMLString;
  ResidentCounty: string;
  BirthPlace: string;
  SpokenLanguages: JSONValue[]; // webapp/context.Response.SpokenLanguages type
  RaceSelections: JSONValue[]; // webapp/context.Response.RaceSelections type
  VisaNumber: string;
  PassportNumber: string;
  StudentId: string;
  LockerNbr: string;
  LockerCombo: string;
  MailboxNbr: string;
  MailboxCombo: string;
  StudentResponsibleSignerInd: boolean;
  StateId: string;
  OptOutOfSellingInformation: 0;
  OptOutOfTargetedAdvertising: 0;
  PublishUserPage: boolean;
  GradebookDefaultInd: boolean;
  DefaultPersonaId: 3;
  CustomField1: string;
  CustomField2: string;
  CustomField3: string;
  CustomField4: string;
  CustomField5: string;
  CustomField6: string;
  CustomField7: string;
  CustomField8: string;
  CustomField9: string;
  CustomField10: string;
  ProfilePhoto: ProfilePhoto;
  ProfilePhotoFile: ProfilePhotoFile;
  Bbid: UUIDString;
  InsertDate: DateTimeString;
  LastModifyDate: DateTimeString;
  LastModifyUserId: number;
};
