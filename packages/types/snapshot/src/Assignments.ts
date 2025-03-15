import { School } from '@oauth2-cli/sky-api';
import { api } from 'datadirect';

export type Item = api.Assignment2.UserAssignmentDetailsGetAllData.Response &
  Partial<School.Assignment>;

export type Data = Item[];
