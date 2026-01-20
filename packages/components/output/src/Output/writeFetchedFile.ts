import { Workflow } from '@msar/workflow';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import { Root } from '@qui-cli/root';
import fs from 'node:fs';
import path from 'node:path';
import { ReadableStream } from 'node:stream/web';

type Options = {
  url: string;
  stream: ReadableStream | Buffer;
  outputPath: string;
};

export async function writeFetchedFile({ url, stream, outputPath }: Options) {
  let localPath = new URL(url).pathname.slice(1);
  try {
    if (localPath == '') {
      localPath = new URL(url).hostname + '/index.html';
    }
    const streamPath = path.resolve(Root.path(), outputPath, localPath);
    fs.mkdirSync(path.dirname(streamPath), {
      recursive: true
    });
    if (stream instanceof Buffer) {
      fs.writeFileSync(streamPath, stream);
    } else {
      await fs.promises.writeFile(streamPath, stream);
    }
    Log.debug(`Saved ${Colors.url(url)} to ${Colors.path(localPath)}`);
    return localPath;
  } catch (error) {
    const message = `Error saving ${Colors.url(url)} to ${Colors.path(localPath)}: ${Colors.error(error)}`;
    if (Workflow.ignoreErrors()) {
      Log.error(message);
    }
    throw new Error(message);
  }
}
