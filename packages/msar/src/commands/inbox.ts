import { Core } from '@battis/qui-cli.core';
import { Inbox } from '@msar/inbox';

await Core.configure({ core: { requirePositionals: true } });
const {
  values,
  positionals: [url, pathToUserListCsv]
} = await Core.init();
await Inbox.analytics(url, pathToUserListCsv, Inbox.Args.parse(values));
