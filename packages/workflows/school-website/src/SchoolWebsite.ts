import '@msar/output';
import * as Plugin from '@qui-cli/plugin';
import * as ContentManagement from './ContentManagement/index.js';

export type Configuration = Plugin.Configuration & {
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
  return {
    flag: {
      photoAlbums: {
        description: `Download photo albums`,
        default: config.photoAlbums
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure({ values });
}

export async function run() {
  if (config.photoAlbums) {
    await ContentManagement.PhotoAlbums.download();
  }
}
