import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { Progress } from '@battis/qui-cli.progress';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { parse as parseCSV, stringify } from 'csv/sync';
import { api as types } from 'datadirect';
import { DatadirectPuppeteer } from 'datadirect-puppeteer';
import moment from 'moment';
import fs from 'node:fs/promises';
import path from 'node:path';
import * as Args from './Args.js';

export { Args };

export type Options = Args.Parsed;

export const name = '@msar/inbox';
export const src = import.meta.dirname;

const AnalyticsColumns = {
  Conversations: 'Conversations',
  MostRecentConversation: 'Most Recent Conversation',
  Sent: 'Sent Messages',
  MostRecentSent: 'Most Recent Sent Message',
  Initiated: 'Initiated Conversations',
  MostRecentInitiated: 'Most Recent Initiated Conversation'
};

export function options(): Plugin.Options {
  return {
    man: [
      {
        text: `Analyze inbox contents for a user or users. Include the URL of the LMS instance as ${Colors.value('arg0')} (required) and path to a CSV file of user identifiers to analyze as ${Colors.value('arg1')} (optional if ${Colors.value('--val')} is set). Intended to receive a generic ${Colors.url('UserWorkList.csv')} export from the LMS as input, outputting the same CSV file to ${Colors.value('--outputPath')} with analysis columns appended.`
      }
    ]
  };
}

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

  const root = await PuppeteerSession.Authenticated.getInstance(url, {
    ...puppeteerOptions,
    ..._options
  });

  Progress.start({ max: data.length });
  outputPath = await Output.avoidOverwrite(
    path.resolve(
      process.cwd(),
      Output.filePathFromOutputPath(
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
          logRequests
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

  if (quit) {
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
