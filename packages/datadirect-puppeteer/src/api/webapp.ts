import { context as Context } from 'datadirect/dist/api/webapp.js';
import { Fetchable } from '../PuppeteerSession.js';

export const context: Fetchable.Binding<Context.Payload, Context.Response> =
  Fetchable.bind(Context);
