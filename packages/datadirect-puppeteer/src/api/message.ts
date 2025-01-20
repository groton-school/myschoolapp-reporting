import {
  conversation as Conversation,
  inbox as Inbox
} from 'datadirect/dist/api/message.js';
import { Fetchable } from '../PuppeteerSession.js';

export const inbox = Fetchable.bind<Inbox.Payload, Inbox.Response>(Inbox);

export const conversation = Fetchable.bind<
  Conversation.Payload,
  Conversation.Response
>(Conversation);
