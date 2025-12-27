import * as Endpoint from '../../../../Endpoint.js';
import { Payload } from '../ContentItem/index.js';
import * as ContentType from '../ContentType.js';

type Options = { plural?: boolean };

export function base(
  contentType: ContentType.Any,
  { plural = false }: Options = {}
) {
  // TODO filater base payload
  let pathComponent = contentType?.Content.toLowerCase().replace(' ', '');
  if (plural) {
    pathComponent = contentType.Content.replace(/^(.+)s$/, '$1');
  }
  return (payload: Payload, base?: string) =>
    Endpoint.prepare({
      payload,
      base,
      path: `/api/${pathComponent}/forsection/:Id/`
    });
}
