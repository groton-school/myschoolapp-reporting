import { PuppeteerSession } from '@msar/puppeteer-session';
import {
  AssignmentMarkingPeriods as AssMarkingPeriods,
  AssignmentSectionsForTeacher as AssSectionsForTeacher,
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
  TopicContentTypesGet as TopicContentTypes,
  GetValidFileTypes as ValidFileTypes
} from 'datadirect/dist/api/datadirect.js';

export const groupFinderByYear: PuppeteerSession.Fetchable.Binding<
  Groups.Payload,
  Groups.Response
> = PuppeteerSession.Fetchable.bind(Groups);

export const SectionInfoView: PuppeteerSession.Fetchable.Binding<
  SectionInfo.Payload,
  SectionInfo.Response
> = PuppeteerSession.Fetchable.bind(SectionInfo);

export const BulletinBoardContentGet: PuppeteerSession.Fetchable.Binding<
  BulletinBoardContent.Payload,
  BulletinBoardContent.Response
> = PuppeteerSession.Fetchable.bind(BulletinBoardContent);

export const GroupPossibleContentGet: PuppeteerSession.Fetchable.Binding<
  BulletinBoardContentTypes.Payload,
  BulletinBoardContentTypes.Response
> = PuppeteerSession.Fetchable.bind(BulletinBoardContentTypes);

export const ImportAssignmentsGet: PuppeteerSession.Fetchable.Binding<
  ImportAssignments.Payload,
  ImportAssignments.Response
> = PuppeteerSession.Fetchable.bind(ImportAssignments);

export const sectiontopicsget: PuppeteerSession.Fetchable.Binding<
  SectionTopics.Payload,
  SectionTopics.Response
> = PuppeteerSession.Fetchable.bind(SectionTopics);

export const TopicContentTypesGet: PuppeteerSession.Fetchable.Binding<
  TopicContentTypes.Payload,
  TopicContentTypes.Response
> = PuppeteerSession.Fetchable.bind(TopicContentTypes);

export const topiccontentget: PuppeteerSession.Fetchable.Binding<
  TopicContent.Payload,
  TopicContent.Response
> = PuppeteerSession.Fetchable.bind(TopicContent);

export const GradeBookMarkingPeriodList: PuppeteerSession.Fetchable.Binding<
  MarkingPeriods.Payload,
  MarkingPeriods.Response
> = PuppeteerSession.Fetchable.bind(MarkingPeriods);

export const sectionrosterget: PuppeteerSession.Fetchable.Binding<
  SectionRoster.Payload,
  SectionRoster.Response
> = PuppeteerSession.Fetchable.bind(SectionRoster);

export const AssignmentMarkingPeriods: PuppeteerSession.Fetchable.Binding<
  AssMarkingPeriods.Payload,
  AssMarkingPeriods.Response
> = PuppeteerSession.Fetchable.bind(AssMarkingPeriods);

export const AssignmentSectionsForTeacher: PuppeteerSession.Fetchable.Binding<
  AssSectionsForTeacher.Payload,
  AssSectionsForTeacher.Response
> = PuppeteerSession.Fetchable.bind(AssSectionsForTeacher);

export const GetValidFileTypes: PuppeteerSession.Fetchable.Binding<
  ValidFileTypes.Payload,
  ValidFileTypes.Response
> = PuppeteerSession.Fetchable.bind(ValidFileTypes);

export async function BulletinBoardContent_detail(
  item: BulletinBoardContent.Item,
  types: BulletinBoardContentTypes.Response,
  options: PuppeteerSession.Fetchable.EndpointOptions<common.ContentItem.Payload>
) {
  if (
    common.ContentType.Static.find(
      (t: common.ContentType.Base) => t.ContentId === item.ContentId
    )
  ) {
    return undefined;
  }
  const endpoint = PuppeteerSession.Fetchable.bind<
    common.ContentItem.Payload,
    common.ContentItem.Any.Content
  >({
    prepare: BulletinBoardContent.prepareContent(item, types)
  });
  return await endpoint(options);
}

export async function TopicContent_detail(
  item: TopicContent.Item,
  types: TopicContentTypes.Response,
  options: PuppeteerSession.Fetchable.EndpointOptions<common.ContentItem.Payload>
) {
  if (
    common.ContentType.Static.find(
      (t: common.ContentType.Base) => t.ContentId === item.ContentId
    )
  ) {
    return undefined;
  }
  const endpoint = PuppeteerSession.Fetchable.bind<
    common.ContentItem.Payload,
    common.ContentItem.Any.Content
  >({
    prepare: TopicContent.prepareContent(item, types)
  });
  return await endpoint(options);
}
