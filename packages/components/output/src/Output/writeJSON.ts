import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import { Root } from '@qui-cli/root';
import path from 'node:path';
import { avoidOverwrite } from './avoidOverwrite.js';
import * as Storage from './Storage.js';
import { writeRecursive } from './writeRecursive.js';

type Options = {
  pretty?: boolean;
  silent?: boolean;
  overwrite?: boolean;
};

export async function writeJSON(
  outputPath: string | undefined,
  data: object | undefined,
  options: Options = {}
) {
  const {
    pretty = Storage.pretty(),
    silent = false,
    overwrite = false
  } = options;
  if (data) {
    if (outputPath) {
      const filePath = overwrite
        ? path.resolve(Root.path(), outputPath)
        : await avoidOverwrite(path.resolve(Root.path(), outputPath));
      writeRecursive(
        filePath,
        pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)
      );
      const message = `Wrote JSON to ${Colors.url(filePath)}`;
      if (silent) {
        Log.debug(message);
      } else {
        Log.info(message);
      }
    } else {
      Log.info(data);
    }
  } else {
    Log.warning('No data to write');
  }
}
