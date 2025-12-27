import { URLString } from '@battis/descriptive-types';

// from webapp.context
export type Persona = {
  Id: number;
  Description: string;
  LongDescription: string;
  Type: number;
  Sort: number;
  Active: boolean;
  StartingPageId: number;
  StartingPageName: string;
  DefaultPersona: boolean;
  UrlFriendlyDescription: string;
  Url: URLString;
  Selected: boolean;
};
