import { DateTimeString } from '@battis/descriptive-types';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { api } from 'datadirect';
import { sky } from '../SkyAPI.js';
import * as Base from './Base.js';

export type SkyAssignment = {
  id: number;
  date: DateTimeString;
  description: string;
  discussion: false;
  due_date: DateTimeString;
  enrolled: number;
  graded_count: number;
  index_id: number;
  major: boolean;
  name: string;
  publish_on_assigned: boolean;
  published: boolean;
  rank: number;
  status: number;
  type: string;
  type_id: number;
};

type SkyAssignmentList = {
  count: number;
  value: SkyAssignment[];
};

export type Data = (api.Assignment2.UserAssignmentDetailsGetAllData.Response &
  Partial<SkyAssignment>)[];

export const snapshot: Base.Snapshot<Data> = async ({
  session,
  groupId: sectionId,
  ignoreErrors,
  logRequests
}) => {
  Debug.withGroupId(sectionId, 'Start capturing assignments');

  const skyAssignments = (
    (await sky().fetch(
      `/school/v1/academics/sections/${sectionId}/assignments`
    )) as SkyAssignmentList
  ).value;

  const assignmentList =
    await DatadirectPuppeteer.api.datadirect.ImportAssignmentsGet({
      payload: {
        sectionId
      }
    });

  const assignments: Data = [];
  for (const assignment of assignmentList) {
    try {
      assignments.push({
        ...(await DatadirectPuppeteer.api.Assignment2.UserAssignmentDetailsGetAllData(
          {
            session,
            payload: {
              assignmentIndexId: assignment.assignment_index_id,
              studentUserId: -1,
              personaId: 3
            },
            logRequests
          }
        )),
        ...skyAssignments.find(
          (skyAssignment) =>
            skyAssignment.index_id == assignment.assignment_index_id
        )
      });
    } catch (error) {
      if (ignoreErrors) {
        Debug.errorWithGroupId(
          sectionId,
          `Error capturing assignment_index_id ${assignment.assignment_index_id}`,
          error as string
        );
      } else {
        throw error;
      }
    }
  }
  Debug.withGroupId(sectionId, 'Assignments captured');
  return assignments;
};
