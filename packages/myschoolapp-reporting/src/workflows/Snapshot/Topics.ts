import cli from '@battis/qui-cli';
import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import { Page } from 'puppeteer';

type Item = types.datadirect.topiccontentget.Item & {
  ObjectType?: types.datadirect.TopicContentTypesGet.Item;
  Content?: types.datadirect.ContentItem.Response | { error: any };
};

type Topic = types.datadirect.sectiontopicsget.Item & {
  Content?: Item[];
};

type Data = Topic[];

export async function capture(
  page: Page,
  Id: number,
  payload: types.datadirect.common.ContentItem.Payload,
  ignoreErrors = true
): Promise<Data | undefined> {
  cli.log.debug(`Group ${Id}: Start capturing topics`);
  try {
    const Topics: Data = [];
    // FIXME cache response from TopicContentTypesGet
    const possibleContent = await api.datadirect.TopicContentTypesGet(page, {});
    const topics = await api.datadirect.sectiontopicsget(
      page,
      {
        format: 'json',
        sharedTopics: true,
        future: !!payload.future,
        expired: !!payload.expired,
        active: !!payload.active
      },
      { Id }
    );
    for (const topic of topics) {
      const { TopicID } = topic;
      const Content: Item[] = [];
      for (const item of await api.datadirect.topiccontentget(
        page,
        {
          format: 'json',
          index_id: topic.TopicIndexID,
          id: topic.TopicIndexID // TODO should this be topic.TopicID?
        },
        {
          TopicID
        }
      )) {
        const ObjectType = possibleContent.find(
          (t: types.datadirect.TopicContentTypesGet.Item) =>
            t.Id == item.ContentId
        );
        try {
          Content?.push({
            ...item,
            ObjectType,
            Content: await api.datadirect.TopicContent_detail(
              item,
              possibleContent
            )(
              page,
              {
                ...payload,
                id: TopicID,
                leadSectionId: Id,
                contextValue: Id,
                topicIndexId: TopicID,
                contentIndexId: topic.TopicIndexID,
                row: item.RowIndex,
                column: item.ColumnIndex,
                cell: item.CellIndex
              },
              { Id }
            )
          });
        } catch (error) {
          if (
            `${error}`.endsWith('is captured by /api/topiccontentget/:TopicID')
          ) {
            Content.push({ ...item, ObjectType });
          } else {
            Content?.push({
              ...item,
              ObjectType,
              Content: { error }
            });
            cli.log.error(
              `Error capturing Topic ${TopicID} content of type ${
                ObjectType?.Name
              } for group ${Id}: ${cli.colors.error(error)}`
            );
          }
        }
      }
      Topics.push({ ...topic, Content: Content.length ? Content : undefined });
    }
    cli.log.debug(`Group ${Id}: Topics captured`);
    return Topics;
  } catch (error) {
    const message = `Group ${Id}: Error capturing topics: ${cli.colors.error(error || 'unknown')}`;
    if (ignoreErrors) {
      cli.log.error(message);
      return undefined;
    } else {
      throw new Error(message);
    }
  }
}
