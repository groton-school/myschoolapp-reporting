import { URLString } from '@battis/descriptive-types';
import { Output } from '@msar/output';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';

export async function cachedDownload(url?: URLString) {
  if (url) {
    const spinner = ora(url).start();
    if (/^\/\//.test(url)) {
      url = `https:${url}`;
    }
    const localPath = new URL(url).pathname.slice(1);
    if (fs.existsSync(path.join(Output.outputPath(), localPath))) {
      Log.debug(
        `Cached ${Colors.url(url)} already present at ${Colors.path(path.join(Output.outputPath(), localPath), Colors.keyword)}`
      );
      spinner.info(Colors.path(localPath, Colors.keyword));
      return localPath;
    } else {
      try {
        const filePath = await Output.writeFetchedFile({
          url,
          stream: (await fetch(url)).body as ReadableStream,
          outputPath: Output.outputPath()
        });
        Log.debug(
          `Downloaded ${Colors.url(url)} to ${Colors.path(filePath, Colors.keyword)}`
        );
        spinner.succeed(Colors.path(filePath, Colors.value));
        return filePath;
      } catch (error) {
        const message = Colors.error(`${error}: ${Colors.url(url)}`);
        Log.error(message);
        spinner.fail(message);
        return undefined;
      }
    }
  }
}
