import { Assignments } from '../../../Entities/index.js';
import * as Endpoint from '../../Endpoint.js';

export type Payload = {
  /** TopicId */
  id: number;
  /** Section.Id */
  leadSectionId: number;
  /** -1 for all */
  row: number;
  /** -1 for all */
  column: number;
  /** -1 for all */
  cell: number;
  /** False for all */
  selectedOnly: boolean;
};
export type Response = Assignments.Assignment[];

export const path = '/api/topic/topicassignmentsget';

export const prepare: Endpoint.Prepare<Payload> = (payload, base?: string) =>
  Endpoint.prepare({ payload, base, path });
