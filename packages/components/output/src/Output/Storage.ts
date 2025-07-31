import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';

export type Configuration = Plugin.Configuration & {
  outputPath?: string;
  pretty?: boolean;
  outputPathDescription?: string;
};

let _outputPath = Root.path();
let _outputPathDescription = `Path to output directory or file to save command output (default: ${Colors.quotedValue(`"${_outputPath}"`)})`;
let _pretty = false;

export function outputPath(value?: string) {
  if (value) {
    _outputPath = value;
  }
  return _outputPath;
}

export function outputPathDescription(value?: string) {
  if (value) {
    _outputPathDescription = value;
  }
  return _outputPathDescription;
}

export function pretty(value?: boolean) {
  if (value !== undefined) {
    _pretty = value;
  }
  return _pretty;
}
