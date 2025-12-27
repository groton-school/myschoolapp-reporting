import { NumericString } from '@battis/descriptive-types';

// from webapp.context
export type Child = {
  Id: number;
  FirstName: string;
  LastName: string;
  NickName: string;
  GradYear: NumericString;
  PublishUserPage: boolean;
  ParentalAccessInd: boolean;
  Role: string;
  ParentRoleId: NumericString;
  ThumbFilename: string;
  LargeFilename: string;
  PhotoEditSettings: string;
};
