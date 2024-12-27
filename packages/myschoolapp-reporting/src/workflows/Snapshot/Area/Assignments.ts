import cli from '@battis/qui-cli';
import { SKY, api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import { Page } from 'puppeteer';
import * as common from '../../../common.js';

type Options = common.SkyAPI.args.Parsed['skyApiOptons'];

export type Data = types.Assignment2.UserAssignmentDetailsGetAllData.Response[];

export async function capture(
  page: Page,
  groupId: string,
  _: URLSearchParams,
  options: Options
) {
  cli.log.debug(`Group ${groupId}: Start capturing assignments`);
  await common.SkyAPI.init(options);

  const assignmentList = (await common.SkyAPI.fetch(
    `school/v1/academics/sections/${groupId}/assignments`
  )) as SKY.AssignmentList;

  const assignments: Data = [];
  if (assignmentList.count > 0) {
    for (const assignment of assignmentList.value) {
      assignments.push(
        await api.Assignment2.UserAssignmentDetailsGetAllData(page, {
          assignmentIndexId: assignment.index_id,
          studentUserId: -1,
          personaId: 3
        })
      );
    }
  }
  cli.log.debug(`Group ${groupId}: Assignments captured`);
  return assignments;
}
