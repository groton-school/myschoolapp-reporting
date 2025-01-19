import { List as L } from 'datadirect/dist/api/Rubric.js';
import { Fetchable } from '../PuppeteerSession.js';

export const List: Fetchable.Binding<L.Payload, L.Response> = Fetchable.bind(L);
