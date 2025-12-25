import { Output } from '@msar/output';
import { SkyAPI } from '@oauth2-cli/sky-api';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import ora from 'ora';
import { cachedDownload } from '../../cachedDownload.js';
import { AnnotatedNewsCategory } from './Annotations.js';

export type Index = AnnotatedNewsCategory[];

export async function download() {
  const index: Index = [];
  const indexPath = await Output.avoidOverwrite(
    Output.filePathFromOutputPath(Output.outputPath(), 'news.json')
  );
  try {
    for await (const category of await SkyAPI.school.v1.contentmanagement.news.categories()) {
      const label =
        category.category_name || `News Category ${category.category_id}`;
      const spinner = ora(label).start();
      const categoryIndex: AnnotatedNewsCategory = category;
      categoryIndex.news_items = [];
      for (const type of [
        'PageContent',
        'Class',
        'Activity',
        'Advisory',
        'Team',
        'Dorm',
        'Community'
      ] as SkyAPI.school.v1.contentmanagement.CategoryRequest['type'][]) {
        categoryIndex.news_items.push(
          ...(await SkyAPI.school.v1.contentmanagement.news.list({
            categories: [
              {
                id: category.category_id,
                type
              }
            ],
            show_secured: true
          }))
        );
        spinner.text = `${label} (${categoryIndex.news_items.length} news items)`;
      }
      spinner.succeed(label);
      for (const item of categoryIndex.news_items) {
        spinner.start(item.headline || `News Item ${item.id}`);
        for (const mediaItem of item.media_item || []) {
          mediaItem.file_path = await cachedDownload(mediaItem.url);
          mediaItem.thumbnail_file_path = await cachedDownload(
            mediaItem.thumbnail_url
          );
        }
        spinner.succeed();
      }
      index.push(categoryIndex);
      Output.writeJSON(indexPath, index, { overwrite: true, silent: true });
    }
  } catch (error) {
    Log.error(Colors.error(error));
  } finally {
    Output.writeJSON(indexPath, index, { overwrite: true });
  }
}
