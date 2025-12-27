import { URLString } from '@battis/descriptive-types';

// from webapp.context
export type Settings = {
  IndividualMessageEnabled: boolean;
  BulkMessageEnabled: boolean;
  BulkEmailEnabled: boolean;
  GoogleLabel: string;
  GoogleUrl: URLString;
  GoogleAccessGranted: boolean;
};
