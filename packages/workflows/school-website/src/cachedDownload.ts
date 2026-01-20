import { URLString } from '@battis/descriptive-types';
import { Output } from '@msar/output';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';

export async function cachedDownload(url?: URLString, minSizeBytes = 0) {
  if (url) {
    const spinner = ora(url).start();
    if (/^\/\//.test(url)) {
      url = `https:${url}`;
    }
    const localPath = new URL(url).pathname.slice(1);
    const filePath = Output.filePathFromOutputPath(
      Output.outputPath(),
      localPath
    );
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      if (stat.size < minSizeBytes) {
        Log.debug(
          `${Colors.path(localPath)} is smaller than ${minSizeBytes} bytes (${stat.size} bytes)`
        );
      } else {
        Log.debug(
          `Cached ${Colors.url(url)} already present at ${Colors.path(path.join(Output.outputPath(), localPath), Colors.keyword)}`
        );
        spinner.info(Colors.path(localPath, Colors.keyword));
        return localPath;
      }
    }
    try {
      const localPath = await Output.writeFetchedFile({
        url,
        stream: (await fetch(url)).body as ReadableStream,
        outputPath: Output.outputPath()
      });
      const filePath = Output.filePathFromOutputPath(
        Output.outputPath(),
        localPath
      );
      if (fs.existsSync(filePath)) {
        Log.debug(
          `Downloaded ${Colors.url(url)} to ${Colors.path(localPath, Colors.keyword)}`
        );
        const stat = fs.statSync(filePath);
        if (stat.size < minSizeBytes) {
          throw new Error(
            `${Colors.path(localPath)} is smaller than ${minSizeBytes} bytes (${stat.size} bytes)`
          );
        }
      } else {
        throw new Error(`${Colors.path(localPath)} does not exist`);
      }
      spinner.succeed(Colors.path(localPath, Colors.value));
      return localPath;
    } catch (error) {
      const message = Colors.error(`${error}: ${Colors.url(url)}`);
      Log.debug(message);
      spinner.fail(message);
      return undefined;
    }
  }
}
