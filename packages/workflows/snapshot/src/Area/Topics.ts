import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { Workflow } from '@msar/workflow';
import { api } from 'datadirect';
import * as Base from './Base.js';

export type Item = api.datadirect.topiccontentget.Item & {
  ObjectType?: api.datadirect.TopicContentTypesGet.Item;
  Content?: api.datadirect.common.ContentItem.Any.Content | { error: string };
};

export type Topic = api.datadirect.sectiontopicsget.Item & {
  Content?: Item[];
};

export type Data = Topic[];

let possibleContent: api.datadirect.TopicContentTypesGet.Response | undefined =
  undefined;

async function getPossibleContent() {
  if (!possibleContent) {
    possibleContent = possibleContent =
      await DatadirectPuppeteer.api.datadirect.TopicContentTypesGet({
        payload: {}
      });
  }
  return possibleContent;
}

export const snapshot: Base.Snapshot<Data> = async ({
  groupId: Id,
  payload,
  ignoreErrors = Workflow.ignoreErrors(),
  studentData,
  ...options
}): Promise<Data | undefined> => {
  Debug.withGroupId(Id, 'Start capturing topics');
  try {
    const Topics: Data = [];
    await getPossibleContent();
    const topics = await DatadirectPuppeteer.api.datadirect.sectiontopicsget({
      ...options,
      payload: {
        // TODO Fix typing to avoid parameter redundancy
        active: true,
        future: true,
        expired: true,
        ...payload,
        format: 'json', // TODO Empirically, `format` is often optional
        sharedTopics: true // TODO sharedTopics should be configurable
      },
      pathParams: { Id }
    });
    if (!Array.isArray(topics)) {
      Log.debug({ topics });
      process.exit();
    }
    for (const topic of topics) {
      const { TopicID } = topic;
      const Content: Item[] = [];
      const items: api.datadirect.topiccontentget.Response = (
        await DatadirectPuppeteer.api.datadirect.topiccontentget({
          ...options,
          payload: {
            format: 'json',
            index_id: topic.TopicIndexID,
            id: topic.TopicIndexID // TODO should this be topic.TopicID?
          },
          pathParams: {
            TopicID
          }
        })
      ).reduce((merged, item) => {
        if (
          !merged.find(
            (m) =>
              m.ColumnIndex === item.ColumnIndex &&
              m.RowIndex === item.RowIndex &&
              m.CellIndex === item.CellIndex &&
              m.ContentId === item.ContentId
          )
        ) {
          merged.push(item);
        }
        return merged;
      }, [] as api.datadirect.topiccontentget.Response);
      for (const item of items) {
        const ObjectType = possibleContent!.find(
          (t: api.datadirect.TopicContentTypesGet.Item) =>
            t.Id == item.ContentId
        );
        try {
          const entry: Item = {
            ...item,
            ObjectType,
            Content:
              await DatadirectPuppeteer.api.datadirect.TopicContent_detail(
                item,
                possibleContent!,
                {
                  ...options,
                  payload: {
                    format: 'json',
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
                  pathParams: { Id }
                }
              )
          };
          if (
            !studentData &&
            entry.ObjectType?.Name === 'Discussion Thread' &&
            'Content' in entry
          ) {
            entry.Content = { error: new Base.StudentDataError().message };
          }
          Content.push(entry);
        } catch (error) {
          if (error instanceof api.datadirect.common.TopicContentError) {
            Content.push({ ...item, ObjectType });
          } else {
            Content?.push({
              ...item,
              ObjectType,
              Content: { error: (error as Error).message }
            });
            if (!(error instanceof Base.StudentDataError)) {
              Debug.errorWithGroupId(
                Id,
                `Error capturing topic {TopicID: ${Colors.value(TopicID)}, ContentItemId: ${Colors.value(item.ContentItemId)}, ObjectType: ${Colors.quotedValue(`"${ObjectType?.Name}"`)}}`,
                error as string
              );
            }
          }
        }
      }
      Topics.push({ ...topic, Content: Content.length ? Content : undefined });
    }
    Debug.withGroupId(Id, 'Topics captured');
    // FIXME filter student data out of topic discussions
    return Topics;
  } catch (error) {
    if (ignoreErrors) {
      Debug.errorWithGroupId(Id, 'Error capturing topics', error as string);
      return undefined;
    } else {
      throw error;
    }
  }
};
