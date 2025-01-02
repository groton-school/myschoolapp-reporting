import { hydrategradebook as Gradebook } from 'datadirect/dist/api/gradebook.js';
import { Fetchable } from '../PuppeteerSession.js';

export const hydrategradebook: Fetchable.Binding<
  Gradebook.Payload,
  Gradebook.Response
> = Fetchable.bind(Gradebook);
