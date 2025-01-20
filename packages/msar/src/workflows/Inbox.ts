import cli from '@battis/qui-cli';
import { parse as parseCSV, stringify } from 'csv/sync';
import { api as types } from 'datadirect';
import { api, PuppeteerSession } from 'datadirect-puppeteer';
import moment from 'moment';
import fs from 'node:fs/promises';
import path from 'node:path';
import * as common from '../common.js';
import * as Args from './Inbox/Args.js';

export { Args };

export type Options = Args.Parsed;

const AnalyticsColumns = {
  Conversations: 'Conversations',
  MostRecentConversation: 'Most Recent Conversation',
  Sent: 'Sent',
  MostRecentSent: 'Most Recent Sent'
};

export async function analytics(
  url?: URL | string,
  pathToUserListCsv?: string,
  options?: Args.Parsed
): Promise<void>;
export async function analytics(
  url?: URL | string,
  options?: Args.Parsed
): Promise<void>;
export async function analytics(
  url?: URL | string,
  pathToUserListCsvOrOptions?: string | Args.Parsed,
  options?: Args.Parsed
): Promise<void> {
  if (!url) {
    throw new Error(`Instance URL must be defined`);
  }

  let pathToUserList: string | undefined = undefined;
  if (typeof pathToUserListCsvOrOptions === 'string') {
    pathToUserList = pathToUserListCsvOrOptions;
  } else if (!pathToUserListCsvOrOptions && options) {
    pathToUserList = undefined;
  } else if (!options) {
    options = pathToUserListCsvOrOptions;
  }
  options = common.Args.hydrate<Args.Parsed>(options, Args.defaults);
  const {
    puppeteerOptions,
    logRequests,
    vals,
    column,
    searchIn,
    outputOptions,
    quit,
    ..._options
  } = options;
  let { outputPath } = outputOptions;

  let columns = [column];
  let data: Record<string, string | number>[] = [];
  if (pathToUserList) {
    data = await parseCSV(
      await fs.readFile(path.resolve(process.cwd(), pathToUserList)),
      {
        bom: true,
        columns: (row: string[]) => {
          if (!row.includes(column)) {
            throw new Error(
              `Column ${cli.colors.quotedValue(`"${column}`)} not found in CSV data: ${row.map((col) => cli.colors.quotedValue(col)).join(', ')}`
            );
          }
          columns = row;
          return row;
        }
      }
    );
    data.push(...vals.map((val) => ({ [column]: val })));
  } else {
    data = vals.map((val) => ({ [column]: val }));
  }

  if (data.length === 0) {
    throw new Error(
      `Inbox users must be passed as either a path to a CSV file or a list of ${cli.colors.value('val')}`
    );
  }

  const root = await PuppeteerSession.Authenticated.getInstance(url, {
    ...puppeteerOptions,
    ..._options
  });

  const progress = cli.progress({ max: data.length });
  outputPath = await common.Output.avoidOverwrite(
    path.resolve(
      process.cwd(),
      common.Output.filePathFromOutputPath(
        outputPath,
        path.basename(Args.defaults.outputOptions.outputPath)
      )
    )
  );
  let writing: Promise<void> | undefined = undefined;
  columns.push(...Object.values(AnalyticsColumns));

  for (const row of data) {
    const val = '' + row[column];
    try {
      const session = await PuppeteerSession.Impersonation.getInstance(root, {
        searchIn,
        val,
        ...puppeteerOptions,
        ..._options
      });
      progress.caption(session.userInfo?.UserNameFormatted || val);

      const conversations: types.message.inbox.Item[] = [];
      let complete = false;
      for (let pageNumber = 1; !complete; pageNumber++) {
        const response = await api.message.inbox({
          session,
          payload: {
            format: 'json',
            pageNumber,
            toDate: moment().format('MM/DD/YYYY')
          },
          logRequests
        });
        conversations.push(...response);
        complete = !response || response.length < types.message.inbox.pageSize;
      }

      row[AnalyticsColumns.Conversations] = conversations.length;

      const recent = conversations.reduce((recent: Date | undefined, c) => {
        const received = c.Messages?.map((m) => new Date(m.SendDate)).reduce(
          (max: Date | undefined, m) => (max && max > m ? max : m),
          undefined
        );
        if (received) {
          if (recent && recent > received) {
            return recent;
          }
          return received;
        }
        return recent;
      }, undefined);
      if (recent) {
        row[AnalyticsColumns.MostRecentConversation] = recent.toLocaleString();
      }

      row[AnalyticsColumns.Sent] = conversations.reduce(
        (sum, c) =>
          sum +
          (c.Messages?.filter(
            (m) => m.FromUser.UserId === session.userInfo?.UserId
          ).length || 0),
        0
      );

      const recentSent = conversations.reduce((recent: Date | undefined, c) => {
        const sent = c.Messages?.filter(
          (m) => m.FromUser.UserId === session.userInfo?.UserId
        )
          .map((m) => new Date(m.SendDate))
          .reduce(
            (max: Date | undefined, m) => (max && max > m ? max : m),
            undefined
          );
        if (sent) {
          if (recent && recent > sent) {
            return recent;
          }
          return sent;
        }
        return recent;
      }, undefined);
      if (recentSent) {
        row[AnalyticsColumns.MostRecentSent] = recentSent.toLocaleString();
      }
      await session.close();
    } catch (error) {
      cli.log.error(
        `Error impersonating ${cli.colors.value(searchIn)}=${cli.colors.quotedValue(`"${val}"`)}: ${cli.colors.error(error)}`
      );
    }
    await writing;
    writing = fs.writeFile(
      outputPath,
      stringify(data, { header: true, columns })
    );
    progress.increment();
  }
  await writing;

  if (quit) {
    await root.close();
  }

  progress.stop();

  cli.log.info(`Analytics written to ${cli.colors.url(outputPath)}`);
}
