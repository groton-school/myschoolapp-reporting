import * as common from '../common.js';

export type Item = common.ContentItem.Container & {
  ContentId: number;
  RowIndex: number;
  ColumnIndex: number;
  CellIndex: 2;
  GenericSettings: any; // TODO DataDirect/BulletinBoardContent.GenericSettings type
  PendingInd: boolean;
};

export type Response = Item[];
