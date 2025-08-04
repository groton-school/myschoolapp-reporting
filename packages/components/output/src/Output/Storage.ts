import { Colors } from '@qui-cli/colors';
import * as Plugin from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';

export type Configuration = Plugin.Configuration & {
  outputPath?: string;
  pretty?: boolean;
  outputPathDescription?: string;
};

let _outputPath = Root.path();
export const OUTPUT_PATH = 'OUTPUT_PATH';
let _outputPathDescription = `Path to output directory or file to save command output (default: ${Colors.quotedValue(
  `"${_outputPath}"`
)}, will use the value in environment variable ${Colors.value(
  OUTPUT_PATH
)} if present)`;
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
