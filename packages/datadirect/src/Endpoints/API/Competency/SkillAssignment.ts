import { JSONValue } from '@battis/typescript-tricks';
import * as Endpoint from '../../Endpoint.js';

export type Payload = { teacherOfSection: number };
// TODO Competency/CompetencySkillAssignmentGet.Response type
export type Response = JSONValue[];

export const path = '/api/Comptency/CompetencySkillAssignmentGet';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({
    payload,
    base,
    path
  });
