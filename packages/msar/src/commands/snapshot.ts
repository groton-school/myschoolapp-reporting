import { Core } from '@battis/qui-cli.core';
import { Snapshot } from '@msar/snapshot';

await Core.configure({ core: { requirePositionals: 1 } });
const {
  positionals: [url],
  values
} = await Core.init();
await Snapshot.snapshot(url, Snapshot.Args.parse(values));
