import { PathString } from '@battis/descriptive-types';
import { ArrayElement } from '@battis/typescript-tricks';
import { SkyAPI } from '@oauth2-cli/sky-api';
import { Endpoints, Entities } from 'datadirect';

type LinkItem<T = PathString> = Omit<
  ArrayElement<
    Endpoints.API.Assignment2.UserAssignmentDetailsGetAllData.Response['LinkItems']
  >,
  'LinkImageUrl' | 'HoverImageUrl'
> & {
  LinkImageUrl: T | null;
  HoverImageUrl: T | null;
};

type DownloadItem<T = PathString> = Omit<
  ArrayElement<
    Endpoints.API.Assignment2.UserAssignmentDetailsGetAllData.Response['DownloadItems']
  >,
  'DownloadUrl'
> & {
  DownloadUrl: T | null;
};

export type Item<T = PathString> =
  Entities.Assignments.Assignment_DataDirectImport &
    Omit<
      Endpoints.API.Assignment2.UserAssignmentDetailsGetAllData.Response,
      'LinkItems' | 'DownloadItems'
    > &
    Partial<SkyAPI.school.v1.academics.sections.assignments.Assignment> & {
      LinkItems: LinkItem<T>[];
      DownloadItems: DownloadItem<T>[];
      Rubric?: Endpoints.API.Rubric.AssignmentRubric.Response;
    };

export type Data<T = PathString> = Item<T>[];
