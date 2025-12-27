import { DateTimeString } from '@battis/descriptive-types';
import { Calendar } from '../Calendars/index.js';
import { Child } from '../Children/index.js';
import { Directory } from '../Directories/index.js';
import { Group } from '../Groups/index.js';
import { Settings } from '../Inbox/index.js';
import { Persona } from '../Personas/index.js';
import { Task } from '../Tasks/index.js';
import { UserInfo } from '../Users/index.js';

export type Context = {
  Expire: DateTimeString;
  Generated: string;
  CacheSource: string;
  UserInfo: UserInfo;
  MasterUserInfo: UserInfo;
  Tasks: Task[];
  Personas: Persona[];
  Groups: Group[];
  Children: Child[];
  IsImpersonating: boolean;
  ViewonlyMode: boolean;
  ShowGuidedTours: boolean;
  GuidedTourSetting: boolean;
  Directories: Directory[];
  Calendars: Calendar[];
  PodiumCalendars: Calendar[];
  AlumHasRegistration: boolean;
  UserParam: {
    HasHelpAccess: boolean;
    ListPersonas: string;
  };
  InboxSettings: Settings;
  IsBBIDUser: boolean;
};
