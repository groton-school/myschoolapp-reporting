import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import * as common from '../../../common.js';
import * as Base from './Base.js';

export type Item = types.datadirect.BulletinBoardContentGet.Item & {
  Content?: types.datadirect.common.ContentItem.Any.Content | { error: string };
  ContentType?: types.datadirect.common.ContentType.Any;
};
export type Data = Item[];

const studentDataContentTypes = ['Roster'];

let possibleContent:
  | types.datadirect.GroupPossibleContentGet.Response
  | undefined = undefined;

async function getPossibleContent(leadSectionId: number) {
  if (!possibleContent) {
    possibleContent = await api.datadirect.GroupPossibleContentGet({
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
  common.Debug.withGroupId(Id, 'Start capturing bulletin board');
  try {
    const BulletinBoard: Data = [];
    await getPossibleContent(Id);
    const items = await api.datadirect.BulletinBoardContentGet({
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
        (e: types.datadirect.ContentType.Any) => e.ContentId == item.ContentId
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
          Content: await api.datadirect.BulletinBoardContent_detail(
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
        BulletinBoard.push({
          ...item,
          ContentType,
          Content: { error: (error as Error).message }
        });
        if (!(error instanceof Base.StudentDataError)) {
          common.Debug.errorWithGroupId(
            Id,
            `Error capturing Bulletin Board ContentId ${item.ContentId} of type ${ContentType?.Content}`,
            error as string
          );
        } else {
          throw error;
        }
      }
    }

    common.Debug.withGroupId(Id, 'Bulletin board captured');
    return BulletinBoard;
  } catch (error) {
    if (ignoreErrors) {
      common.Debug.errorWithGroupId(
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
