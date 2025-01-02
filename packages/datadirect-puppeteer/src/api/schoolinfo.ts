import { schoolparams as S } from 'datadirect/dist/api/schoolinfo.js';
import { Fetchable } from '../PuppeteerSession.js';

export const schoolparams: Fetchable.Binding<S.Payload, S.Response> =
  Fetchable.bind(S);
