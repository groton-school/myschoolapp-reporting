import * as Endpoint from '../../../../Endpoint.js';
import { Payload } from '../ContentItem/index.js';

export function assignment() {
  return (payload: Payload, base?: string) => {
    const {
      id,
      leadSectionId,
      row = null,
      column = null,
      cell = null
    } = payload;
    if (!id) {
      throw new Error('id must be set (usually to topic.TopicID');
    }
    if (!leadSectionId) {
      throw new Error('leadSectionId must be set (usually to section.Id');
    }
    return Endpoint.prepare({
      payload: {
        id,
        leadSectionId,
        row,
        column,
        cell,
        selectedOnly: true // TODO make assignments selectedOnly configurable?
      },
      base,
      path: '/api/topic/topicassignmentsget/'
    });
  };
}
