import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';

export * from './Output/avoidOverwrite.js';
export { filePathFromOutputPath } from './Output/filePathFromOutputPath.js';
export * from './Output/OutputError.js';
export { oxfordComma } from './Output/oxfordComma.js';
export { pathsafeTimestamp } from './Output/pathsafeTimestamp.js';
export { writeFetchedFile } from './Output/writeFetchedFile.js';
export { writeJSON } from './Output/writeJSON.js';
export { writeRecursive } from './Output/writeRecursive.js';

export type Configuration = Plugin.Configuration & {
  outputPath?: string;
  pretty?: boolean;
};

export const name = '@msar/output';
export const src = import.meta.dirname;

let _outputPath = Root.path();
let _pretty = true;

export function options(): Plugin.Options {
  return {
    opt: {
      outputPath: {
        short: 'o',
        description: `Path to output directory or file to save command output (default: ${Colors.quotedValue(`"${_outputPath}"`)})`,
        default: _outputPath
      }
    },
    flag: {
      pretty: {
        description: `Pretty print output to file (if ${Colors.value('--outputPath')} option is used)`
      }
    }
  };
}

export function configure(config: Configuration = {}) {
  _outputPath = Plugin.hydrate(config.outputPath, _outputPath);
  _pretty = Plugin.hydrate(config.pretty, _pretty);
}

export function init(args: Plugin.ExpectedArguments<typeof options>) {
  configure(args.values);
}

export function outputPath() {
  return _outputPath;
}

export function pretty() {
  return _pretty;
}
