import cli from '@battis/qui-cli';
import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
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
  cli.log.debug(`Group ${Id}: Start capturing bulletin board`);
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
          cli.log.error(
            `Error capturing Bulletin Board content of type ${ContentType?.Content} for group ${Id}: ${cli.colors.error(error)}`
          );
        }
      }
    }

    cli.log.debug(`Group ${Id}: Bulletin board captured`);
    return BulletinBoard;
  } catch (error) {
    const message = `Group ${Id}: Error capturing bulletin board: ${cli.colors.error(error || 'unknown')}`;
    if (ignoreErrors) {
      cli.log.error(message);
      return undefined;
    } else {
      throw new Error(message);
    }
  }
};
