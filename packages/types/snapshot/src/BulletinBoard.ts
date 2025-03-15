import { api } from 'datadirect';

export type Item = api.datadirect.BulletinBoardContentGet.Item & {
  Content?: api.datadirect.common.ContentItem.Any.Content | { error: string };
  ContentType?: api.datadirect.common.ContentType.Any;
};
export type Data = Item[];
