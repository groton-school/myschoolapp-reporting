import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import * as common from '../../../common.js';
import * as Base from './Base.js';

export type Data = types.Assignment2.UserAssignmentDetailsGetAllData.Response[];

export const snapshot: Base.Snapshot<Data> = async ({
  session,
  groupId: sectionId,
  ignoreErrors,
  logRequests
}) => {
  common.Debug.withGroupId(sectionId, 'Start capturing assignments');

  const assignmentList = await api.datadirect.ImportAssignmentsGet({
    payload: {
      sectionId
    }
  });

  const assignments: Data = [];
  for (const assignment of assignmentList) {
    try {
      assignments.push(
        await api.Assignment2.UserAssignmentDetailsGetAllData({
          session,
          payload: {
            assignmentIndexId: assignment.assignment_index_id,
            studentUserId: -1,
            personaId: 3
          },
          logRequests
        })
      );
    } catch (error) {
      if (ignoreErrors) {
        common.Debug.errorWithGroupId(
          sectionId,
          `Error capturing assignment_index_id ${assignment.assignment_index_id}`,
          error as string
        );
      } else {
        throw error;
      }
    }
  }
  common.Debug.withGroupId(sectionId, 'Assignments captured');
  return assignments;
};
