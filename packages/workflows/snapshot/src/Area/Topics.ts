import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import * as Snapshot from '@msar/types.snapshot';
import { Workflow } from '@msar/workflow';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import { api } from 'datadirect';
import * as Base from './Base.js';

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

function isMedia(
  entry: Snapshot.Topics.Item
): entry is Snapshot.Topics.MediaItem {
  return (
    entry.ObjectType?.Name === 'Photo' ||
    entry.ObjectType?.Name == 'Audio' ||
    entry.ObjectType?.Name === 'Video' ||
    entry.ObjectType?.Name === 'Media'
  );
}

export const snapshot: Base.Snapshot<Snapshot.Topics.Data> = async ({
  groupId: Id,
  payload,
  ignoreErrors = Workflow.ignoreErrors(),
  studentData,
  ...options
}): Promise<Snapshot.Topics.Data | undefined> => {
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
            ObjectType
          };
          if (
            !studentData &&
            entry.ObjectType?.Name === 'Discussion Thread' &&
            'Content' in entry
          ) {
            entry.Content = { error: new Base.StudentDataError().message };
          }
          if (isMedia(entry) && entry.ContentItemId) {
            entry.AlbumContent = {
              AlbumId: entry.ContentItemId,
              // @ts-ignore-error
              Content: await DatadirectPuppeteer.api.media.AlbumFilesGet({
                ...options,
                payload: {
                  format: 'json',
                  albumId: entry.ContentItemId,
                  logView: false
                }
              })
            };
          } else {
            // @ts-ignore-error
            entry.Content =
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
