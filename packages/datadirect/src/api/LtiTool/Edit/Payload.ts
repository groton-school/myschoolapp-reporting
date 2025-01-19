import { NumericString, URLString } from '@battis/descriptive-types';

// TODO LtiTool/Edit/Payload types
export type Payload = {
  ToolTitle: string;
  ToolDescription: string;
  LaunchUrl: null | URLString;
  ConsumerKey: null | string;
  SharedSecret: null | string;
  ProviderId: number;
  ConsentScreenInd: null | any;
  OutcomesInd: null | any;
  MessagesInd: null | any;
  SendUserName: null | string;
  SendUserEmail: null | string;
  SendUserRole: null | any;
  SendUserImage: null | any;
  PresentationTarget: null;
  PresentationHeight: null | number;
  PresentationWidth: null | number;
  ContextLabelId: number;
  ContextValue: NumericString;
  Gradeable: boolean;
  LtiVersionId: null | any;
  CredentialsTypeId: number;
  Parameters: any[];
  FieldsToNull: ['LtiVersionId'];
};
