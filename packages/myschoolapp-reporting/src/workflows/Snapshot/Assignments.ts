import cli from '@battis/qui-cli';
import { api, SKY } from 'datadirect';
import { Page } from 'puppeteer';
import * as common from '../../common.js';

type Options = common.SkyAPI.args.Parsed['skyApiOptons'];

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

  const assignments: api.Assignment2.Response[] = [];
  if (assignmentList.count > 0) {
    const host = new URL(page.url()).hostname;

    for (const assignment of assignmentList.value) {
      assignments.push(
        await page.evaluate(async (id: number) => {
          return await (
            await fetch(
              `https://${host}/api/assignment2/UserAssignmentDetailsGetAllStudentData?assignmentIndexId=${id}&studentUserId=-1&personaId=3`
            )
          ).json();
        }, assignment.index_id)
      );
    }
  }
  cli.log.debug(`Group ${groupId}: Assignments captured`);
  return assignments;
}
