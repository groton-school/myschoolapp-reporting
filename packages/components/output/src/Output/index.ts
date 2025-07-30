import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import * as Storage from './Storage.js';

export * from './avoidOverwrite.js';
export * from './filePathFromOutputPath.js';
export * from './OutputError.js';
export * from './oxfordComma.js';
export * from './pathsafeFilename.js';
export * from './pathsafeTimestamp.js';
export * from './Storage.js';
export * from './writeFetchedFile.js';
export * from './writeJSON.js';
export * from './writeRecursive.js';

export const name = '@msar/output';

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
