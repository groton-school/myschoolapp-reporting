import {
  NumericBoolean,
  NumericString,
  URLString
} from '@battis/descriptive-types';
import { JSONValue } from '@battis/typescript-tricks';

// TODO LtiTool/Edit/Payload types
export type Settings = {
  ToolTitle: string;
  ToolDescription: string;
  LaunchUrl: null | URLString;
  ConsumerKey: null | string;
  SharedSecret: null | string;
  ProviderId: number;
  ConsentScreenInd: null | NumericBoolean;
  OutcomesInd: null | NumericBoolean;
  MessagesInd: null | NumericBoolean;
  SendUserName: null | string;
  SendUserEmail: null | string;
  SendUserRole: null | JSONValue;
  SendUserImage: null | JSONValue;
  PresentationTarget: null;
  PresentationHeight: null | number;
  PresentationWidth: null | number;
  ContextLabelId: number;
  ContextValue: NumericString;
  Gradeable: boolean;
  LtiVersionId: null | JSONValue;
  CredentialsTypeId: number;
  Parameters: JSONValue[];
  FieldsToNull: ['LtiVersionId'];
};
