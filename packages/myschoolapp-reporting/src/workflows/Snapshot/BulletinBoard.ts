import cli from '@battis/qui-cli';
import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import { Page } from 'puppeteer';

export type Item = types.datadirect.BulletinBoardContentGet.Item & {
  Content?: types.datadirect.ContentItem.Response | { error: any };
  ContentType?: types.datadirect.ContentType.Any;
};
export type Data = Item[];

export async function capture(
  page: Page,
  Id: number,
  payload: types.datadirect.common.ContentItem.Payload = { format: 'json' },
  ignoreErrors = true
): Promise<Data | undefined> {
  cli.log.debug(`Group ${Id}: Start capturing bulletin board`);
  try {
    const BulletinBoard: Data = [];
    // FIXME cache response from GroupPossibleContentGet
    const possibleContent: types.datadirect.GroupPossibleContentGet.Response =
      await api.datadirect.GroupPossibleContentGet(page, {
        format: 'json',
        leadSectionId: Id
      });
    const items = await api.datadirect.BulletinBoardContentGet(page, {
      format: 'json',
      sectionId: Id,
      associationId: 1,
      pendingInd: false
    });
    for (const item of items) {
      const ContentType = possibleContent.find(
        (e: types.datadirect.ContentType.Any) => e.ContentId == item.ContentId
      );
      try {
        BulletinBoard.push({
          ...item,
          ContentType,
          Content: await api.datadirect.BulletinBoardContent_detail(
            item,
            possibleContent
          )(page, { ...payload, contextValue: Id }, { Id })
        });
      } catch (error) {
        BulletinBoard.push({
          ...item,
          ContentType,
          Content: { error }
        });
        cli.log.error(
          `Error capturing Bulletin Board content of type ${ContentType?.Content} for group ${Id}: ${cli.colors.error(error)}`
        );
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
}
