import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import * as Snapshot from '@msar/types.snapshot';
import { SkyAPI } from '@oauth2-cli/sky-api';
import * as Base from './Base.js';

export const snapshot: Base.Snapshot<Snapshot.Assignments.Data> = async ({
  session,
  groupId: sectionId,
  ignoreErrors,
  logRequests
}) => {
  Debug.withGroupId(sectionId, 'Start capturing assignments');

  const skyAssignments = (
    await SkyAPI.requestJSON<SkyAPI.school.v1.academics.sections.assignments.AssignmentCollection>(
      `/school/v1/academics/sections/${sectionId}/assignments`
    )
  ).value;

  const assignmentList =
    await DatadirectPuppeteer.API.DataDirect.ImportAssignmentsGet({
      payload: {
        sectionId
      }
    });

  const assignments: Snapshot.Assignments.Data = [];
  for (const assignment of assignmentList) {
    try {
      const ass: Snapshot.Assignments.Item = {
        ...assignment,
        ...(await DatadirectPuppeteer.API.Assignment2.UserAssignmentDetailsGetAllData(
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
      };
      if (ass.RubricId > 0) {
        ass.Rubric = await DatadirectPuppeteer.API.Rubric.assignmentRubric({
          payload: { id: ass.RubricId }
        });
      }
      assignments.push(ass);
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
