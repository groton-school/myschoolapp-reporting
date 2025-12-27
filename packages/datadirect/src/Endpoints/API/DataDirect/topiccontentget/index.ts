import * as Endpoint from '../../../Endpoint.js';
import * as TopicContentTypesGet from '../TopicContentTypesGet/index.js';
import * as common from '../common/index.js';
import { Payload } from './Payload.js';
import { Item } from './Response.js';

export * from './Payload.js';
export * from './Response.js';

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
