import { Output } from '@msar/output';
import { SkyAPI } from '@oauth2-cli/sky-api';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import ora from 'ora';
import { AnnotatedAnnouncementCategory } from './Annotations.js';

export type Index = AnnotatedAnnouncementCategory[];

export async function download() {
  const index: Index = [];
  const indexPath = await Output.avoidOverwrite(
    Output.filePathFromOutputPath(Output.outputPath(), 'announcements.json')
  );
  try {
    for await (const category of await SkyAPI.school.v1.contentmanagement.announcements.categories()) {
      const label =
        category.category_name ||
        `Announcement Category ${category.category_id}`;
      const spinner = ora(label).start();
      const categoryIndex: AnnotatedAnnouncementCategory = category;
      categoryIndex.announcements = [];
      for (const type of [
        'PageContent',
        'Class',
        'Activity',
        'Advisory',
        'Team',
        'Dorm',
        'Community'
      ] as SkyAPI.school.v1.contentmanagement.CategoryRequest['type'][]) {
        categoryIndex.announcements.push(
          ...(await SkyAPI.school.v1.contentmanagement.announcements.list({
            categories: [{ id: category.category_id, type }],
            show_secured: true
          }))
        );
        spinner.text = `${label} (${categoryIndex.announcements.length} announcements)`;
      }
      index.push(categoryIndex);
      Output.writeJSON(indexPath, index, { overwrite: true, silent: true });
      spinner.succeed();
    }
  } catch (error) {
    Log.error(Colors.error(error));
  } finally {
    Output.writeJSON(indexPath, index, { overwrite: true });
  }
}
