import * as Endpoint from '../../../Endpoint.js';
import * as ContentItem from './ContentItem.js';
import { Container } from './ContentItem/Response.js';
import * as ContentType from './ContentType.js';
import { NotImplementedError, TopicContentError } from './Errors.js';
import { assignment } from './prepareContent/assignment.js';
import { base } from './prepareContent/base.js';
import { discussionThread } from './prepareContent/discussionThread.js';
import { media } from './prepareContent/media.js';
import { rssReader } from './prepareContent/rssReader.js';
import { widget } from './prepareContent/widget.js';

export function prepareContent(
  container: Container,
  types: ContentType.Any[]
): Endpoint.Prepare<ContentItem.Payload> {
  const contentType = types.find((e) => e.ContentId == container.ContentId);
  switch (contentType?.Content) {
    case 'Audio':
    case 'Video':
    case 'Photo':
      return media(container);
    case 'Widget':
      return widget();
    case 'RSS Reader':
      return rssReader();
    case 'Discussion Thread':
      return discussionThread();
    case 'Assignment':
      return assignment();
    case 'Horizontal Line':
    case 'Spacer':
    case 'Cover Brief':
    case 'Cover Image':
    case 'Cover Title':
      throw new Error(
        `There is no content endpoint for ${contentType.Content}`
      );
    case 'Roster':
    case 'Learning Tool':
      // FIXME capture Learning Tool content data
      throw new NotImplementedError(
        `Capturing ${contentType.Content} is not yet supported`
      );
    case 'Downloads':
    case 'Expectations':
    case 'Links':
    case 'Events':
      return base(contentType, { plural: true });
    default:
      if (contentType) {
        return base(contentType);
      } else {
        throw new Error(
          `Unknown content type in container: ${JSON.stringify(container)}`
        );
      }
  }
}
