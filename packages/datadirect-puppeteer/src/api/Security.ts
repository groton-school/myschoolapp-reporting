import {
  ImpersonateStart as Start,
  ImpersonateStop as Stop
} from 'datadirect/dist/api/Security.js';
import { Fetchable } from '../PuppeteerSession.js';

// @ts-expect-error 2344
export const ImpersonateStart: Fetchable.Binding<Start.Payload, undefined> =
  Fetchable.bind(Start);

// @ts-expect-error 2344
export const ImpersonateStop: Fetchable.Binding<Stop.Payload, undefined> =
  Fetchable.bind(Stop);
