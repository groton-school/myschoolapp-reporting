import { buildQuery } from '../../../../../buildQuery.js';
import * as SkyAPI from '../../../../../Client.js';
import { AssignmentCollection } from './AssignmentCollection.js';

type Options = {
  types?: string;
  status?: '0' | '1' | '2' | '-1';
  persona_id?: 2 | 3;
  filter?: 'expired' | 'future' | 'all';
  search?: string;
};

export async function assignmentsBySection(
  section_id: number,
  params: Options = {}
) {
  return await SkyAPI.requestJSON<AssignmentCollection>(
    `school/v1/academics/sections/${section_id}/assignments?${buildQuery(params)}`
  );
}
