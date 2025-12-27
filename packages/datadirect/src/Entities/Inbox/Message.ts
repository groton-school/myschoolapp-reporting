import {
  DateTimeString,
  HTMLString,
  NumericTimestamp
} from '@battis/descriptive-types';
import { FromUser } from './FromUser.js';

export type Message = {
  MessageId: number;
  ConversationId: number;
  Body: HTMLString;
  FromUser: FromUser;
  SendDate: DateTimeString;
  SendDateTicks: NumericTimestamp;
  ReadInd: boolean;
};
