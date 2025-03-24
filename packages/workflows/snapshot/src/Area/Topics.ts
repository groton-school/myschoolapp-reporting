import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import * as Snapshot from '@msar/types.snapshot';
import { Workflow } from '@msar/workflow';
import { api } from 'datadirect';
import * as Base from './Base.js';
import { DEFAULT_ID_KEYS, merge } from './merge.js';

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

export const snapshot: Base.Snapshot<Snapshot.Topics.Data> = async (
  {
    groupId: Id,
    payload,
    ignoreErrors = Workflow.ignoreErrors(),
    studentData,
    ...options
  },
  prev?: Snapshot.Topics.Data
): Promise<Snapshot.Topics.Data | undefined> => {
  Debug.withGroupId(Id, 'Start capturing topics');
  try {
    const Topics: Snapshot.Topics.Data = [];
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
      const [detail] = await DatadirectPuppeteer.api.datadirect.topicget({
        payload: { format: 'json' },
        pathParams: { TopicID }
      });
      const Content: Snapshot.Topics.Item[] = [];
      const items: api.datadirect.topiccontentget.Response =
        await DatadirectPuppeteer.api.datadirect.topiccontentget({
          ...options,
          payload: {
            format: 'json',
            index_id: topic.TopicIndexID,
            id: topic.TopicID
          },
          pathParams: {
            TopicID
          }
        });
      for (const item of items) {
        const ObjectType = possibleContent!.find(
          (t: api.datadirect.TopicContentTypesGet.Item) =>
            t.Id == item.ContentId
        );
        try {
          const entry: Snapshot.Topics.Item = {
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
          if (
            (entry.ObjectType?.Name == 'Photo' ||
              entry.ObjectType?.Name == 'Video' ||
              entry.ObjectType?.Name == 'Audio' ||
              entry.ObjectType?.Name == 'Media') &&
            Array.isArray(entry.Content)
          ) {
            const albumIds = entry.Content?.map(
              (content: any) => content.AlbumId
            ).filter((id, i, arr) => arr.indexOf(id) === i);
            // @ts-expect-error
            nextItem.AlbumContent = await Promise.all(
              albumIds.map(async (albumId) => ({
                AlbumId: albumId,
                Content: await DatadirectPuppeteer.api.media.AlbumFilesGet({
                  ...options,
                  payload: {
                    format: 'json',
                    albumId,
                    logView: false
                  }
                })
              }))
            );
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
      Topics.push({
        ...topic,
        ...detail,
        Content: Content.length ? Content : undefined
      });
    }
    Debug.withGroupId(Id, 'Topics captured');
    // FIXME filter student data out of topic discussions
    if (prev) {
      return merge(prev, Topics, ['TopicID', ...DEFAULT_ID_KEYS]);
    }
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
