import * as Endpoint from '../../../../Endpoint.js';
import { Payload } from '../ContentItem/index.js';

export function discussionThread() {
  return (payload: Payload, base?: string) => {
    const {
      format,
      contentIndexId = null,
      viewDate = null,
      topicIndexId = null
    } = payload;
    if (!topicIndexId) {
      throw new Error(
        'topicIndexId must be set (usually to topic.TopicIndexId'
      );
    }
    if (!contentIndexId) {
      throw new Error(
        'contentIndexId must be set (usually to topic.TopicIndexID('
      );
    }
    return Endpoint.prepare({
      payload: {
        format,
        contentIndexId,
        viewDate,
        topicIndexId,
        contentId: 386 // TODO weird that this seems to be hard-coded
      },
      base,
      path: '/api/discussionitem/discussionitemsget/'
    });
  };
}
