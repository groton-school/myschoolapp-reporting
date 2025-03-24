import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import * as Snapshot from '@msar/types.snapshot';
import { Workflow } from '@msar/workflow';
import { api } from 'datadirect';
import * as Base from './Base.js';
import { DEFAULT_ID_KEYS, merge } from './merge.js';

const studentDataContentTypes = ['Roster'];

let possibleContent:
  | api.datadirect.GroupPossibleContentGet.Response
  | undefined = undefined;

async function getPossibleContent(leadSectionId: number) {
  if (!possibleContent) {
    possibleContent =
      await DatadirectPuppeteer.api.datadirect.GroupPossibleContentGet({
        payload: {
          format: 'json',
          leadSectionId
        }
      });
  }
  return possibleContent;
}

export const snaphot: Base.Snapshot<Snapshot.BulletinBoard.Data> = async (
  {
    session,
    groupId: Id,
    payload = { format: 'json' },
    ignoreErrors = Workflow.ignoreErrors(),
    studentData,
    logRequests
  },
  prev?: Snapshot.BulletinBoard.Data
): Promise<Snapshot.BulletinBoard.Data | undefined> => {
  Debug.withGroupId(Id, 'Start capturing bulletin board');
  try {
    const BulletinBoard: Snapshot.BulletinBoard.Data = [];
    await getPossibleContent(Id);
    const items =
      await DatadirectPuppeteer.api.datadirect.BulletinBoardContentGet({
        session,
        payload: {
          format: 'json',
          sectionId: Id,
          associationId: 1,
          pendingInd: false
        },
        logRequests
      });
    for (const item of items) {
      const ContentType = possibleContent!.find(
        (e: api.datadirect.ContentType.Any) => e.ContentId == item.ContentId
      );
      try {
        if (
          ContentType &&
          studentDataContentTypes.includes(ContentType.Content) &&
          !studentData
        ) {
          throw new Base.StudentDataError();
        }
        const entry: Snapshot.BulletinBoard.Item = {
          ...item,
          ContentType,
          Content:
            await DatadirectPuppeteer.api.datadirect.BulletinBoardContent_detail(
              item,
              possibleContent!,
              {
                session,
                payload: { ...payload, contextValue: Id, contextLabelId: 2 },
                pathParams: { Id },
                logRequests
              }
            )
        };
        if (
          (entry.ContentType?.Content == 'Photo' ||
            entry.ContentType?.Content == 'Video' ||
            entry.ContentType?.Content == 'Audio' ||
            entry.ContentType?.Content == 'Media') &&
          Array.isArray(entry.Content)
        ) {
          const albumIds = entry.Content?.map(
            (content: any) => content.AlbumId
          ).filter((id, i, arr) => arr.indexOf(id) === i);
          // @ts-expect-error
          entry.AlbumContent = await Promise.all(
            albumIds.map(async (albumId) => ({
              AlbumId: albumId,
              Content: await DatadirectPuppeteer.api.media.AlbumFilesGet({
                session,
                payload: {
                  format: 'json',
                  albumId,
                  logView: false
                },
                logRequests
              })
            }))
          );
        }
        BulletinBoard.push(entry);
      } catch (error) {
        switch (item.ContentId) {
          case 78:
          case 79:
          case 80:
            BulletinBoard.push({
              ...item,
              ContentType,
              Content: {
                error: `${(error as Error).message}\n\nDEBUG: This ContentId is empirically associated with unpublished items in a possibly-corrupted Bulletin Board layout.`
              }
            });
            break;
          default:
            BulletinBoard.push({
              ...item,
              ContentType,
              Content: { error: (error as Error).message }
            });
            if (!(error instanceof Base.StudentDataError)) {
              if (ignoreErrors) {
                Debug.errorWithGroupId(
                  Id,
                  `Error capturing bulletin board item`,
                  error as string
                );
              } else {
                throw error;
              }
            }
        }
      }
    }

    Debug.withGroupId(Id, 'Bulletin board captured');
    if (prev) {
      return merge(prev, BulletinBoard, [
        'ContentId',
        ...DEFAULT_ID_KEYS,
        'Url'
      ]);
    }
    return BulletinBoard;
  } catch (error) {
    if (ignoreErrors) {
      Debug.errorWithGroupId(
        Id,
        'Error capturing bulletin board',
        error as string
      );
      return undefined;
    } else {
      throw error;
    }
  }
};
