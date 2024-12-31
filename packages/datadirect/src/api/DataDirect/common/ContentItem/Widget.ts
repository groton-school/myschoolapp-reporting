import { HTMLString } from '@battis/descriptive-types';

export type Widget = {
  WidgetId: number;
  ShortDescription: string;
  LongDescription: HTMLString;
  ContextLabelId: number;
  ContextValue: number;
  SortOrder: number;
};

export type Content = Widget[];
