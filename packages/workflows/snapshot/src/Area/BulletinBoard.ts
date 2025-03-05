import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { api } from 'datadirect';
import * as Base from './Base.js';

export type Item = api.datadirect.BulletinBoardContentGet.Item & {
  Content?: api.datadirect.common.ContentItem.Any.Content | { error: string };
  ContentType?: api.datadirect.common.ContentType.Any;
};
export type Data = Item[];

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

export const snaphot: Base.Snapshot<Data> = async ({
  session,
  groupId: Id,
  payload = { format: 'json' },
  ignoreErrors = true,
  studentData,
  logRequests
}): Promise<Data | undefined> => {
  Debug.withGroupId(Id, 'Start capturing bulletin board');
  try {
    const BulletinBoard: Data = [];
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
        BulletinBoard.push({
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
        });
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
