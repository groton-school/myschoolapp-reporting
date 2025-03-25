import { PathString } from '@battis/descriptive-types';
import { ArrayElement } from '@battis/typescript-tricks';
import { School } from '@oauth2-cli/sky-api';
import { api } from 'datadirect';

type LinkItem<T = PathString> = Omit<
  ArrayElement<
    api.Assignment2.UserAssignmentDetailsGetAllData.Response['LinkItems']
  >,
  'LinkImageUrl' | 'HoverImageUrl'
> & {
  LinkImageUrl: T | null;
  HoverImageUrl: T | null;
};

type DownloadItem<T = PathString> = Omit<
  ArrayElement<
    api.Assignment2.UserAssignmentDetailsGetAllData.Response['DownloadItems']
  >,
  'DownloadUrl'
> & {
  DownloadUrl: T | null;
};

export type Item<T = PathString> = api.datadirect.ImportAssignmentsGet.Item &
  Omit<
    api.Assignment2.UserAssignmentDetailsGetAllData.Response,
    'LinkItems' | 'DownloadItems'
  > &
  Partial<School.Assignment> & {
    LinkItems: LinkItem<T>[];
    DownloadItems: DownloadItem<T>[];
    Rubric?: api.Rubric.AssignmentRubric.Response;
  };

export type Data<T = PathString> = Item<T>[];
