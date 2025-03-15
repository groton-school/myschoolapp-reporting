import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import * as Snapshot from '@msar/types.snapshot';
import { School } from '@oauth2-cli/sky-api';
import { sky } from '../SkyAPI.js';
import * as Base from './Base.js';

export const snapshot: Base.Snapshot<Snapshot.Assignments.Data> = async ({
  session,
  groupId: sectionId,
  ignoreErrors,
  logRequests
}) => {
  Debug.withGroupId(sectionId, 'Start capturing assignments');

  const skyAssignments = (
    (await sky().fetch(
      `/school/v1/academics/sections/${sectionId}/assignments`
    )) as School.AssignmentList
  ).value;

  const assignmentList =
    await DatadirectPuppeteer.api.datadirect.ImportAssignmentsGet({
      payload: {
        sectionId
      }
    });

  const assignments: Snapshot.Assignments.Data = [];
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
