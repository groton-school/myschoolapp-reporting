import * as Endpoint from '../../../../Endpoint.js';
import { Container, Payload } from '../ContentItem/index.js';

export function media(container: Container) {
  return (payload: Payload, base?: string) => {
    const {
      format,
      editMode = null,
      active = null,
      future = null,
      expired = null,
      contextLabelId = null
    } = payload;
    return Endpoint.prepare({
      payload: {
        format,
        ContentId: container.ContentId,
        editMode,
        active,
        future,
        expired,
        contextLabelId
      },
      base,
      path: `/api/media/sectionmediaget/:Id`
    });
  };
}
