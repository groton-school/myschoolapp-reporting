import * as Endpoint from '../../../../Endpoint.js';
import { Payload } from '../ContentItem/index.js';

export function rssReader() {
  return (payload: Payload, base?: string) => {
    // TODO filter rssReader payload
    if (!payload.contextValue) {
      throw new Error(`contextValue must be set (usually to section.Id)`);
    }
    return Endpoint.prepare({
      payload,
      base,
      path: `/api/rssreader/forsection/`
    });
  };
}
