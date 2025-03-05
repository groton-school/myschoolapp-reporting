import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { api } from 'datadirect';
import * as Base from './Base.js';

export type Data = api.Assignment2.UserAssignmentDetailsGetAllData.Response[];

export const snapshot: Base.Snapshot<Data> = async ({
  session,
  groupId: sectionId,
  ignoreErrors,
  logRequests
}) => {
  Debug.withGroupId(sectionId, 'Start capturing assignments');

  const assignmentList =
    await DatadirectPuppeteer.api.datadirect.ImportAssignmentsGet({
      payload: {
        sectionId
      }
    });

  const assignments: Data = [];
  for (const assignment of assignmentList) {
    try {
      assignments.push(
        await DatadirectPuppeteer.api.Assignment2.UserAssignmentDetailsGetAllData(
          {
            session,
            payload: {
              assignmentIndexId: assignment.assignment_index_id,
              studentUserId: -1,
              personaId: 3
            },
            logRequests
          }
        )
      );
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
