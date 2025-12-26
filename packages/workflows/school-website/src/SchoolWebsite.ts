import { URLString } from '@battis/descriptive-types';
import '@msar/output';
import { Colors } from '@qui-cli/colors';
import * as Plugin from '@qui-cli/plugin';
import * as ContentManagement from './ContentManagement/index.js';

export type Configuration = Plugin.Configuration & {
  url?: URLString;
  announcements?: boolean;
  news?: boolean;
  photoAlbums?: boolean;
  videos?: boolean;
};

export const name = 'school-website';
const config: Configuration = {
  announcements: true,
  news: true,
  photoAlbums: true,
  videos: true
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
    opt: {
      url: {
        description: `URL of MySchoolApp instance (required if capturing ${Colors.flagArg('--videos')})`,
        hint: Colors.url('https://example.myschoolapp.com'),
        default: config.url
      }
    },
    flag: {
      announcements: {
        description: `Download announcements`,
        default: config.announcements
      },
      news: {
        description: `Download news items`,
        default: config.news
      },
      photoAlbums: {
        description: `Download photo albums`,
        default: config.photoAlbums
      },
      videos: {
        description: `Download videos`,
        default: config.videos
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export async function run() {
  if (config.announcements) {
    await ContentManagement.Announcements.download();
  }
  if (config.news) {
    await ContentManagement.News.download();
  }
  if (config.photoAlbums) {
    await ContentManagement.PhotoAlbums.download();
  }
  if (config.videos) {
    const { url } = config;
    if (!url) {
      throw new Error(
        `${Colors.optionArg('--url')} is required to download videos`
      );
    }
    await ContentManagement.Videos.download(url);
  }
}
