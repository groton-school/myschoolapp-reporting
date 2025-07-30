import * as common from '../common.js';
import { JSONValue } from '@battis/typescript-tricks';

export type Item = common.ContentItem.Container & {
  ContentId: number;
  RowIndex: number;
  ColumnIndex: number;
  CellIndex: 2;
  GenericSettings: JSONValue; // TODO DataDirect/BulletinBoardContent.GenericSettings type
  PendingInd: boolean;
};

export type Response = Item[];
