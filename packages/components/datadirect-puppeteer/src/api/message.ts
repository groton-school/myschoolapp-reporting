import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  conversation as Conversation,
  inbox as Inbox
} from 'datadirect/dist/api/message/index.js';

export const inbox = PuppeteerSession.Fetchable.bind<
  Inbox.Payload,
  Inbox.Response
>(Inbox);

export const conversation = PuppeteerSession.Fetchable.bind<
  Conversation.Payload,
  Conversation.Response
>(Conversation);
