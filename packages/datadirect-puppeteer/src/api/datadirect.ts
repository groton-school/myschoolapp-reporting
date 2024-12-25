import {
  BulletinBoardContentGet as BulletinBoardContent,
  GroupPossibleContentGet as BulletinBoardContentTypes,
  ContentItem,
  ContentType,
  groupFinderByYear as Groups,
  SectionInfoView as SectionInfo,
  sectiontopicsget as SectionTopics,
  topiccontentget as TopicContent,
  TopicContentTypesGet as TopicContentTypes
} from 'datadirect/dist/api/datadirect.js';
import { fetchViaPuppeteer } from './fetchViaPuppeteer.js';

export const groupFinderByYear = fetchViaPuppeteer<
  Groups.Payload,
  Groups.Response
>(Groups);

export const SectionInfoView = fetchViaPuppeteer<
  SectionInfo.Payload,
  SectionInfo.Response
>(SectionInfo);

export const BulletinBoardContentGet = fetchViaPuppeteer<
  BulletinBoardContent.Payload,
  BulletinBoardContent.Response
>(BulletinBoardContent);

export const GroupPossibleContentGet = fetchViaPuppeteer<
  BulletinBoardContentTypes.Payload,
  BulletinBoardContentTypes.Response
>(BulletinBoardContentTypes);

export function BulletinBoardContent_detail(
  item: BulletinBoardContent.Item,
  types: BulletinBoardContentTypes.Response
) {
  if (
    ContentType.Static.find(
      (t: ContentType.Base) => t.ContentId === item.ContentId
    )
  ) {
    return () => undefined;
  }
  return fetchViaPuppeteer<ContentItem.Payload, ContentItem.Response>({
    prepare: BulletinBoardContent.prepareContent(item, types)
  });
}

export const sectiontopicsget = fetchViaPuppeteer<
  SectionTopics.Payload,
  SectionTopics.Response
>(SectionTopics);

export const TopicContentTypesGet = fetchViaPuppeteer<
  TopicContentTypes.Payload,
  TopicContentTypes.Response
>(TopicContentTypes);

export const topiccontentget = fetchViaPuppeteer<
  TopicContent.Payload,
  TopicContent.Response
>(TopicContent);

export function TopicContent_detail(
  item: TopicContent.Item,
  types: TopicContentTypes.Response
) {
  if (
    ContentType.Static.find(
      (t: ContentType.Base) => t.ContentId === item.ContentId
    )
  ) {
    return () => undefined;
  }
  return fetchViaPuppeteer<ContentItem.Payload, ContentItem.Response>({
    prepare: TopicContent.prepareContent(item, types)
  });
}
