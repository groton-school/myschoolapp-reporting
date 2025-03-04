import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import * as Storage from './Output/Storage.js';

export * from './Output/avoidOverwrite.js';
export { filePathFromOutputPath } from './Output/filePathFromOutputPath.js';
export * from './Output/OutputError.js';
export { oxfordComma } from './Output/oxfordComma.js';
export * from './Output/pathSafeFilename.js';
export { pathsafeTimestamp } from './Output/pathsafeTimestamp.js';
export { Configuration } from './Output/Storage.js';
export { writeFetchedFile } from './Output/writeFetchedFile.js';
export { writeJSON } from './Output/writeJSON.js';
export { writeRecursive } from './Output/writeRecursive.js';

export const name = '@msar/output';
export const src = import.meta.dirname;

export function options(): Plugin.Options {
  return {
    opt: {
      outputPath: {
        short: 'o',
        description: `Path to output directory or file to save command output (default: ${Colors.quotedValue(`"${Storage.outputPath()}"`)})`,
        default: Storage.outputPath()
      }
    },
    flag: {
      pretty: {
        description: `Pretty print output to file (if ${Colors.value('--outputPath')} option is used)`
      }
    }
  };
}

export function configure(config: Storage.Configuration = {}) {
  Storage.outputPath(Plugin.hydrate(config.outputPath, Storage.outputPath()));
  Storage.pretty(Plugin.hydrate(config.pretty, Storage.pretty()));
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  configure(args.values);
}

export function outputPath() {
  return Storage.outputPath();
}

export function pretty() {
  return Storage.pretty();
}
