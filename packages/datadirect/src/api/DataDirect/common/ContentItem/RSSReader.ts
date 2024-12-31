import { URLString } from '@battis/descriptive-types';

export type Content = {
  ContextLabelId: number;
  ContextValue: number;
  ReaderId: number;
  Url: URLString;
  NumberOfItems: number;
};
