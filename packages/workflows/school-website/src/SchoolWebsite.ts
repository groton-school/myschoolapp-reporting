import { SkyAPI } from '@oauth2-cli/sky-api';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  count?: number;
};

export const name = 'school-website';
const config: Configuration = { count: 10 };

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

export function options(): Plugin.Options {
  return {
    man: [{ level: 1, text: 'School Website options' }],
    num: {
      count: {
        default: config.count
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export async function run() {
  try {
    let i = 0;
    for await (const category of await SkyAPI.school.v1.contentmanagement.photoalbums.categories()) {
      Log.info({ category });
      const albums = await SkyAPI.school.v1.contentmanagement.photoalbums.list({
        categories: [{ id: category.id }],
        show_secured: true
      });
      Log.info({ albums });
      for await (const album of albums) {
        Log.info({ album });
        if (album.id) {
          for await (const media of await SkyAPI.school.v1.contentmanagement.photoalbums.photosById(
            album.id
          )) {
            Log.info({ media });
            i++;
            if (config.count && i >= config.count) {
              process.exit();
            }
          }
        }
      }
    }
  } catch (error) {
    Log.error({ error });
  }
}
