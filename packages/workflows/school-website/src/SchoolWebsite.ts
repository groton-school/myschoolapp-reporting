import '@msar/output';
import * as Plugin from '@qui-cli/plugin';
import * as ContentManagement from './ContentManagement/index.js';

export type Configuration = Plugin.Configuration & {
  news?: boolean;
  photoAlbums?: boolean;
};

export const name = 'school-website';
const config: Configuration = {
  news: true,
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
    man: [{ level: 1, text: 'School Website options' }],
    flag: {
      news: {
        description: `Download news items`,
        default: config.news
      },
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
  if (config.news) {
    await ContentManagement.News.download();
  }
  if (config.photoAlbums) {
    await ContentManagement.PhotoAlbums.download();
  }
}
