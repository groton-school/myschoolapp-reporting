import {
  BulletinBoardContentGet as BulletinBoardContent,
  GroupPossibleContentGet as BulletinBoardContentTypes,
  common,
  groupFinderByYear as Groups,
  ImportAssignmentsGet as ImportAssignments,
  GradeBookMarkingPeriodList as MarkingPeriods,
  SectionInfoView as SectionInfo,
  sectionrosterget as SectionRoster,
  sectiontopicsget as SectionTopics,
  topiccontentget as TopicContent,
  TopicContentTypesGet as TopicContentTypes
} from 'datadirect/dist/api/datadirect.js';
import { Fetchable } from '../PuppeteerSession.js';

export const groupFinderByYear: Fetchable.Binding<
  Groups.Payload,
  Groups.Response
> = Fetchable.bind(Groups);

export const SectionInfoView: Fetchable.Binding<
  SectionInfo.Payload,
  SectionInfo.Response
> = Fetchable.bind(SectionInfo);

export const BulletinBoardContentGet: Fetchable.Binding<
  BulletinBoardContent.Payload,
  BulletinBoardContent.Response
> = Fetchable.bind(BulletinBoardContent);

export const GroupPossibleContentGet: Fetchable.Binding<
  BulletinBoardContentTypes.Payload,
  BulletinBoardContentTypes.Response
> = Fetchable.bind(BulletinBoardContentTypes);

export const ImportAssignmentsGet: Fetchable.Binding<
  ImportAssignments.Payload,
  ImportAssignments.Response
> = Fetchable.bind(ImportAssignments);

export const sectiontopicsget: Fetchable.Binding<
  SectionTopics.Payload,
  SectionTopics.Response
> = Fetchable.bind(SectionTopics);

export const TopicContentTypesGet: Fetchable.Binding<
  TopicContentTypes.Payload,
  TopicContentTypes.Response
> = Fetchable.bind(TopicContentTypes);

export const topiccontentget: Fetchable.Binding<
  TopicContent.Payload,
  TopicContent.Response
> = Fetchable.bind(TopicContent);

export const GradeBookMarkingPeriodList: Fetchable.Binding<
  MarkingPeriods.Payload,
  MarkingPeriods.Response
> = Fetchable.bind(MarkingPeriods);

export const sectionrosterget: Fetchable.Binding<
  SectionRoster.Payload,
  SectionRoster.Response
> = Fetchable.bind(SectionRoster);

export function BulletinBoardContent_detail(
  item: BulletinBoardContent.Item,
  types: BulletinBoardContentTypes.Response
) {
  if (
    common.ContentType.Static.find(
      (t: common.ContentType.Base) => t.ContentId === item.ContentId
    )
  ) {
    return () => undefined;
  }
  return Fetchable.bind<
    common.ContentItem.Payload,
    common.ContentItem.Any.Content
  >({
    prepare: BulletinBoardContent.prepareContent(item, types)
  });
}

export function TopicContent_detail(
  item: TopicContent.Item,
  types: TopicContentTypes.Response
) {
  if (
    common.ContentType.Static.find(
      (t: common.ContentType.Base) => t.ContentId === item.ContentId
    )
  ) {
    return () => undefined;
  }
  return Fetchable.bind<
    common.ContentItem.Payload,
    common.ContentItem.Any.Content
  >({
    prepare: TopicContent.prepareContent(item, types)
  });
}
