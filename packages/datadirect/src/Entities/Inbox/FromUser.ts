import { DateString } from '@battis/descriptive-types';
import { ProfilePhoto } from '../Users/index.js';

export type FromUser = {
  RowNumber: number;
  RowTotal: number;
  UserId: 7193544;
  FirstName: string;
  LastName: string;
  EmailEffectiveDate?: DateString;
  RetireDate?: DateString;
  StudentDisplay: string;
  UserNameFormatted: string;
  DeceasedDate?: DateString;
  BirthDate?: DateString;
  ResidentFromDate?: DateString;
  VisaIssueDate?: DateString;
  VisaExpireDate?: DateString;
  PassportExpireDate?: DateString;
  AnticipatedCompletionDate?: DateString;
  ClearProfilePhoto: boolean;
  ProfilePhoto: ProfilePhoto;
};
