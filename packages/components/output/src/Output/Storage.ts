import * as Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';

export type Configuration = Plugin.Configuration & {
  outputPath?: string;
  pretty?: boolean;
};

let _outputPath = Root.path();
let _pretty = false;

export function outputPath(value?: string) {
  if (value) {
    _outputPath = value;
  }
  return _outputPath;
}

export function pretty(value?: boolean) {
  if (value !== undefined) {
    _pretty = value;
  }
  return _pretty;
}
