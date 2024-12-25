import * as Endpoint from '../Endpoint.js';
import * as common from './common.js';
import { Payload } from './topiccontentget/Payload.js';
import { Item } from './topiccontentget/Response.js';
import * as TopicContentTypesGet from './TopicContentTypesGet.js';

export * from './topiccontentget/Payload.js';
export * from './topiccontentget/Response.js';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path: `/api/datadirect/topiccontentget/:TopicID/`
  });

export function prepareContent(
  item: Item,
  types: TopicContentTypesGet.Response
) {
  return common.prepareContent(
    item,
    types.map((t) => ({ Content: t.Name, ContentId: t.Id }))
  );
}
