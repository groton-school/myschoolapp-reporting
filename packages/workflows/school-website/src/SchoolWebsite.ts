import { PathString } from '@battis/descriptive-types';
import '@msar/output';
import { Positionals } from '@qui-cli/core';
import * as Plugin from '@qui-cli/plugin';
import * as ContentManagement from './ContentManagement/index.js';

export type Configuration = Plugin.Configuration & {
  outputPath?: PathString;
  photoAlbums?: boolean;
};

export const name = 'school-website';
const config: Configuration = {
  photoAlbums: true
};

export function configure(proposal: Partial<Configuration> = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

export function options(): Plugin.Options {
  Positionals.require({
    outputPath: {}
  });
  Positionals.allowOnlyNamedArgs();
  return {
    flag: {
      photoalbums: {
        description: `Download photo albums`,
        default: config.photoAlbums
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  const outputPath = Positionals.get('outputPath');
  configure({ outputPath, values });
}

export async function run() {
  const { outputPath } = config;
  if (!outputPath) {
    throw new Error('Output path must be defined');
  }
  await ContentManagement.PhotoAlbums.download({ outputPath });
}
