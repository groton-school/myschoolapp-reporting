import { Core } from '@battis/qui-cli.core';
import { Download } from '@msar/download';

await Core.configure({ core: { requirePositionals: 1 } });
const {
  values,
  positionals: [snapshotPath]
} = await Core.init();
await Download.download(snapshotPath, Download.Args.parse(values));
