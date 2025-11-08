import { Core, Positionals } from '@qui-cli/core';
import { Env } from '@qui-cli/env-1password';
import { Markdown } from '@qui-cli/markdown';
import { register } from '@qui-cli/plugin';
import fs from 'node:fs';
import path from 'node:path';
import * as Archive from './Archive.js';

await register(Archive);

Env.configure({ root: path.dirname(import.meta.dirname) });
Markdown.configure({
  outputPath: path.join(import.meta.dirname, '../README.md'),
  pre: fs
    .readFileSync(path.join(import.meta.dirname, '../docs/pre.md'))
    .toString(),
  overwrite: true
});
Positionals.requireNoMoreThan(0);

await Core.init();
await Markdown.run();
