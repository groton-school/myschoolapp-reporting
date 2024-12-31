import cli from '@battis/qui-cli';
import { api as types } from 'datadirect';
import * as Base from './Base.js';

export type Data = types.Assignment2.UserAssignmentDetailsGetAllData.Response[];

export const snapshot: Base.Snapshot<Data> = async ({
  api,
  groupId: sectionId
}) => {
  cli.log.debug(`Group ${sectionId}: Start capturing assignments`);

  const assignmentList = await api.datadirect.ImportAssignmentsGet({
    payload: {
      sectionId
    }
  });

  const assignments: Data = [];
  for (const assignment of assignmentList) {
    assignments.push(
      await api.Assignment2.UserAssignmentDetailsGetAllData({
        payload: {
          assignmentIndexId: assignment.assignment_index_id,
          studentUserId: -1,
          personaId: 3
        }
      })
    );
  }
  cli.log.debug(`Group ${sectionId}: Assignments captured`);
  return assignments;
};
