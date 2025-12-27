import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  Conversation,
  Inbox
} from 'datadirect/dist/Endpoints/API/Message/index.js';

export const inbox = PuppeteerSession.Fetchable.bind<
  Inbox.Payload,
  Inbox.Response
>(Inbox);

export const conversation = PuppeteerSession.Fetchable.bind<
  Conversation.Payload,
  Conversation.Response
>(Conversation);
