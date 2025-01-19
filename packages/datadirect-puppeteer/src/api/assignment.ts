import {
  ViewAssignmentOptions as AssignmentOptions,
  TypesForSectionSpa as TypesForSection
} from 'datadirect/dist/api/assignment.js';
import { Fetchable } from '../PuppeteerSession.js';

export const TypesForSectionSpa: Fetchable.Binding<
  TypesForSection.Payload,
  TypesForSection.Response
> = Fetchable.bind(TypesForSection);

export const ViewAssignmentOptions: Fetchable.Binding<
  AssignmentOptions.Payload,
  AssignmentOptions.Response
> = Fetchable.bind(AssignmentOptions);
