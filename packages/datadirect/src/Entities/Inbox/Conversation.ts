import { Message } from './Message.js';
import { Participant } from './Participant.js';

export type Conversation = {
  ConversationId: number;
  ReplyToAll: boolean;
  Subject: string;
  Participants: Participant[];
  Messages?: Message[];
};
