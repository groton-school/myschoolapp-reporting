export type Message = {
  MessageId: number;
  UserId: number;
  ParentMessageId: number;
  Message: HTMLString;
  ApprovalInd: boolean;
  MessageDate: DateTimeString;
  FirstName: string;
  LastName: string;
  UserPhoto: string;
  ModifiedDate: DateTimeString;
  ChildRank: number;
  ParentRank: number;
  ParentDate: DateTimeString;
  ParentDateTicks: NumericTimestamp;
  ModifiedDateTicks: NumericTimestamp;
  EmbedId: number;
  EmbedText: string;
  EmbedTitle: string;
  SectionId: number;
  OwnerPost: boolean;
  LocalDate: DateTimeString;
  InsertDate: DateTimeString;
};

export type Content = Message[];
