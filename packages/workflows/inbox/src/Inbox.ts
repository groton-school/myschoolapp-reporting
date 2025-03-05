import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { Progress } from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { Workflow } from '@msar/workflow';
import { parse as parseCSV, stringify } from 'csv/sync';
import { api as types } from 'datadirect';
import moment from 'moment';
import fs from 'node:fs/promises';
import path from 'node:path';

await Core.configure({ core: { requirePositionals: true } });

export type Configuration = {
  vals?: string[];
  column?: string;
  searchIn?: string;
};

export const name = '@msar/inbox';
export const src = import.meta.dirname;

let url: string | undefined = undefined;
let pathToUserListCsv: string | undefined = undefined;
let vals: string[] = [];
let column = 'User ID';
let searchIn = 'UserID';

const AnalyticsColumns = {
  Conversations: 'Conversations',
  MostRecentConversation: 'Most Recent Conversation',
  Sent: 'Sent Messages',
  MostRecentSent: 'Most Recent Sent Message',
  Initiated: 'Initiated Conversations',
  MostRecentInitiated: 'Most Recent Initiated Conversation'
};

export function configure(config: Configuration = {}) {
  vals = Plugin.hydrate(config.vals, vals);
  column = Plugin.hydrate(config.column, column);
  searchIn = Plugin.hydrate(config.searchIn, searchIn);
}

export function options(): Plugin.Options {
  const puppeteerOptions = PuppeteerSession.options();
  const outputOptions = Output.options();
  const outputPath = path.join(Output.outputPath(), 'inboxAnalysis.csv');
  return {
    flag: {
      headless: {
        ...puppeteerOptions.flag?.headless,
        description: puppeteerOptions.flag?.headless?.description?.replace(
          /\(default: .*\)/,
          `default: ${Colors.value('false')}, use ${Colors.value('--no-headless')} to not run headless. Due to the number of impersonated clicks necessary for this workflow, running headless reduces the likelihood of stray user actions interfering with the script.`
        ),
        default: false
      }
    },
    opt: {
      outputPath: {
        ...outputOptions.opt?.outputPath,
        description: outputOptions.opt?.outputPath?.description?.replace(
          Output.outputPath(),
          path.resolve(Root.path(), outputPath)
        ),
        default: outputPath
      },
      column: {
        description: `Column label for CSV input (${Colors.value('arg1')}) column containing user identifier for inboxes to analyze. Required if opening a CSV of user identifiers. (default: ${Colors.quotedValue(`"${column}"`)})`,
        default: column
      },
      searchIn: {
        description: `Field to search for user identifier. Required for all uses. One of ${[
          ...Object.keys(PuppeteerSession.SearchIn),
          ...Object.values(PuppeteerSession.SearchIn)
        ]
          .map((key) => Colors.quotedValue(`"${key}"`))
          .join(', ')
          .replace(
            /, ([^,]+)$/,
            ' or $1'
          )} (default: ${Colors.quotedValue(`"${searchIn}"`)})`,
        default: searchIn
      }
    },
    optList: {
      val: {
        description: `A user identifier to query. Requires corresponding ${Colors.value('--searchIn')}. If set, ${Colors.value('arg1')} path to CSV file is not required.`,
        short: 'v',
        default: vals
      }
    },
    man: [
      {
        text: `Analyze inbox contents for a user or users. Include the URL of the LMS instance as ${Colors.value('arg0')} (required) and path to a CSV file of user identifiers to analyze as ${Colors.value('arg1')} (optional if ${Colors.value('--val')} is set). Intended to receive a generic ${Colors.url('UserWorkList.csv')} export from the LMS as input, outputting the same CSV file to ${Colors.value('--outputPath')} with analysis columns appended.`
      }
    ]
  };
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  const {
    values,
    positionals: [_url, _pathToUserListCsv]
  } = args;
  url = Plugin.hydrate(_url, url);
  pathToUserListCsv = Plugin.hydrate(_pathToUserListCsv, pathToUserListCsv);
  configure(values);
}

export async function analytics(
  url?: URL | string,
  pathToUserListCsv?: string,
  options?: Configuration
): Promise<void>;
export async function analytics(
  url?: URL | string,
  options?: Configuration
): Promise<void>;
export async function analytics(
  url?: URL | string,
  pathToUserListCsvOrOptions?: string | Configuration,
  options?: Configuration
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
              `Column ${Colors.quotedValue(`"${column}`)} not found in CSV data: ${row.map((col) => Colors.quotedValue(col)).join(', ')}`
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
      `Inbox users must be passed as either a path to a CSV file or a list of ${Colors.value('val')}`
    );
  }

  const root = await PuppeteerSession.Authenticated.getInstance(url);

  Progress.start({ max: data.length });
  const outputPath = await Output.avoidOverwrite(
    path.resolve(
      process.cwd(),
      Output.filePathFromOutputPath(
        Output.outputPath(),
        path.basename(Output.outputPath())
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
        val
      });
      Progress.caption(session.userInfo?.UserNameFormatted || val);

      const conversations: types.message.inbox.Item[] = [];
      let complete = false;
      for (let pageNumber = 1; !complete; pageNumber++) {
        const response = await DatadirectPuppeteer.api.message.inbox({
          session,
          payload: {
            format: 'json',
            pageNumber,
            toDate: moment().format('MM/DD/YYYY')
          },
          logRequests: Workflow.logRequests()
        });
        for (const preview of response) {
          const { ConversationId } = preview;
          conversations.push(
            await DatadirectPuppeteer.api.message.conversation({
              session,
              payload: { format: 'json', markAsRead: false },
              pathParams: { ConversationId }
            })
          );
        }
        complete = !response || response.length < types.message.inbox.pageSize;
      }

      row[AnalyticsColumns.Conversations] = conversations.length;
      row[AnalyticsColumns.MostRecentConversation] =
        newestMessage(
          excludeUndefined(conversations.map((c) => newestMessage(c.Messages)))
        )?.SendDate || '';

      row[AnalyticsColumns.Sent] = conversations.reduce(
        (sum, c) => sum + (sentMessages(c.Messages, session)?.length || 0),
        0
      );
      row[AnalyticsColumns.MostRecentSent] =
        newestMessage(
          excludeUndefined(
            conversations.map((c) =>
              newestMessage(sentMessages(c.Messages, session))
            )
          )
        )?.SendDate || '';

      /*
       * FIXME Initiated and sent counts and dates are identical
       *   I need to do some spot checking to figure out if one or both are being calculated incorrectly.
       */
      row[AnalyticsColumns.Initiated] = conversations
        .map((c) => (isSender(oldestMessage(c.Messages), session) ? 1 : 0))
        .reduce((sum: number, i) => sum + i, 0);
      row[AnalyticsColumns.MostRecentInitiated] =
        newestMessage(
          excludeUndefined(
            conversations.map((c) => {
              const oldest = oldestMessage(c.Messages);
              if (isSender(oldest, session)) {
                return oldest;
              }
              return undefined;
            })
          )
        )?.SendDate || '';

      await session.close();
    } catch (error) {
      Log.error(
        `Error impersonating ${Colors.value(searchIn)}=${Colors.quotedValue(`"${val}"`)}: ${Colors.error(error)}`
      );
    }
    await writing;
    writing = fs.writeFile(
      outputPath,
      stringify(data, { header: true, columns })
    );
    Progress.increment();
  }
  await writing;

  if (PuppeteerSession.quit()) {
    await root.close();
  }

  Progress.stop();

  Log.info(`Analytics written to ${Colors.url(outputPath)}`);
}

function oldestMessage(messages: types.message.Types.Message[] = []) {
  return messages?.reduce(
    (oldest: types.message.Types.Message | undefined, message) => {
      if (oldest && new Date(oldest.SendDate) < new Date(message.SendDate)) {
        return oldest;
      }
      return message;
    },
    undefined
  );
}

function newestMessage(messages: types.message.Types.Message[] = []) {
  return messages?.reduce(
    (newest: types.message.Types.Message | undefined, message) => {
      if (newest && new Date(newest.SendDate) > new Date(message.SendDate)) {
        return newest;
      }
      return message;
    },
    undefined
  );
}

function isSender(
  message: types.message.Types.Message | undefined,
  session: PuppeteerSession.Impersonation
) {
  return message && message.FromUser.UserId === session.userInfo?.UserId;
}

function sentMessages(
  messages: types.message.Types.Message[] = [],
  session: PuppeteerSession.Impersonation
) {
  return messages?.filter((message) => isSender(message, session));
}

function excludeUndefined(
  messages: (types.message.Types.Message | undefined)[]
) {
  return messages.filter(
    (message) => message !== undefined
  ) as types.message.Types.Message[];
}
