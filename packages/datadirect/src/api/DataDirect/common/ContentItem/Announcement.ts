export type Announcement = {
  Name: string;
  Author: string;
  PublishDate: DateTimeString;
  Description: HTMLString;
  Id: number;
  GroupName: string;
  PublishDateDisplay: DateString;
  ExpireDateDisplay: DateString;
  GroupId: number;
  Expired: boolean;
};

export type Content = Announcement[];
