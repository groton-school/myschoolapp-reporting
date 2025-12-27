import { JSONValue } from '@battis/typescript-tricks';
import * as common from '../common/index.js';

export type Item = common.ContentItem.Container & {
  ContentId: number;
  RowIndex: number;
  ColumnIndex: number;
  CellIndex: 2;
  GenericSettings: JSONValue; // TODO DataDirect/BulletinBoardContent.GenericSettings type
  PendingInd: boolean;
};

export type Response = Item[];
