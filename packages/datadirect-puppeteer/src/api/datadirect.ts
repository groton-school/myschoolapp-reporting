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
import { Page } from 'puppeteer';
import * as PuppeteerSession from '../PuppeteerSession.js';

export class datadirect extends PuppeteerSession.Fetchable {
  public groupFinderByYear: PuppeteerSession.BoundEndpoint<
    Groups.Payload,
    Groups.Response
  >;
  public SectionInfoView: PuppeteerSession.BoundEndpoint<
    SectionInfo.Payload,
    SectionInfo.Response
  >;
  public BulletinBoardContentGet: PuppeteerSession.BoundEndpoint<
    BulletinBoardContent.Payload,
    BulletinBoardContent.Response
  >;
  public GroupPossibleContentGet: PuppeteerSession.BoundEndpoint<
    BulletinBoardContentTypes.Payload,
    BulletinBoardContentTypes.Response
  >;
  public ImportAssignmentsGet: PuppeteerSession.BoundEndpoint<
    ImportAssignments.Payload,
    ImportAssignments.Response
  >;
  public sectiontopicsget: PuppeteerSession.BoundEndpoint<
    SectionTopics.Payload,
    SectionTopics.Response
  >;
  public TopicContentTypesGet: PuppeteerSession.BoundEndpoint<
    TopicContentTypes.Payload,
    TopicContentTypes.Response
  >;
  public topiccontentget: PuppeteerSession.BoundEndpoint<
    TopicContent.Payload,
    TopicContent.Response
  >;
  public GradeBookMarkingPeriodList: PuppeteerSession.BoundEndpoint<
    MarkingPeriods.Payload,
    MarkingPeriods.Response
  >;
  public sectionrosterget: PuppeteerSession.BoundEndpoint<
    SectionRoster.Payload,
    SectionRoster.Response
  >;

  BulletinBoardContent_detail(
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
    return this.bindEndpoint<
      common.ContentItem.Payload,
      common.ContentItem.Any.Content
    >({
      prepare: BulletinBoardContent.prepareContent(item, types)
    });
  }

  TopicContent_detail(
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
    return this.bindEndpoint<
      common.ContentItem.Payload,
      common.ContentItem.Any.Content
    >({
      prepare: TopicContent.prepareContent(item, types)
    });
  }

  public constructor(
    url: URL | string | Page,
    options?: PuppeteerSession.Options
  ) {
    super(url, options);

    this.groupFinderByYear = this.bindEndpoint(Groups);
    this.SectionInfoView = this.bindEndpoint(SectionInfo);
    this.BulletinBoardContentGet = this.bindEndpoint(BulletinBoardContent);
    this.GroupPossibleContentGet = this.bindEndpoint(BulletinBoardContentTypes);
    this.ImportAssignmentsGet = this.bindEndpoint(ImportAssignments);
    this.sectiontopicsget = this.bindEndpoint(SectionTopics);
    this.TopicContentTypesGet = this.bindEndpoint(TopicContentTypes);
    this.topiccontentget = this.bindEndpoint(TopicContent);
    this.GradeBookMarkingPeriodList = this.bindEndpoint(MarkingPeriods);
    this.sectionrosterget = this.bindEndpoint(SectionRoster);
  }
}
