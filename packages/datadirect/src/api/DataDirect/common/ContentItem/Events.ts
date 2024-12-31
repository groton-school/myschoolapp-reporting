import {
  DateString,
  DateTimeString,
  EmailString,
  HTMLString,
  NumericString,
  TimeString
} from '@battis/descriptive-types';

export type Event = {
  Id: number;
  StartDate: DateTimeString;
  EndDate: DateTimeString;
  StartTime: DateTimeString;
  EndTime: DateTimeString;
  GroupId: number;
  GroupName: string;
  Cancelled: boolean;
  Name: string;
  Location: string;
  BuildingRoomId: number;
  SignupEmail: EmailString;
  EmailDisplayName: string;
  BriefDescription: HTMLString;
  BriefDescriptionInd: number;
  LongDescriptionInd: number;
  Description: HTMLString;
  RegistrationPublishDate: DateString;
  RegistrationExpireDate: DateString;
  CreateDate: DateTimeString;
  ModifyDate: DateTimeString;
  PrimaryGroup: boolean;
  RegistrationPublished: boolean;
  IsStartDateEqualsEndDate: boolean;
  StartDateDisplay: DateString;
  EndDateDisplay: DateString;
  StartTimeDisplay: TimeString;
  EndTimeDisplay: TimeString;
  MonthLabel: string;
  DayLabel: NumericString;
  Featured: boolean;
  AllDay: boolean;
  TotalDays: number;
  RecurrenceId: number;
};

export type Content = Event[];
