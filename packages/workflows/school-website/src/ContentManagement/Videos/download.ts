import { URLString } from '@battis/descriptive-types';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { Workflow } from '@msar/workflow';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import ora from 'ora';
import { cachedDownload } from '../../cachedDownload.js';
import { AnnotatedVideo, AnnotatedVideoCategory } from './Annotations.js';

export type Index = AnnotatedVideoCategory[];

export async function download(
  url: URLString,
  session?: PuppeteerSession.Authenticated
) {
  const index: Index = [];
  const indexPath = await Output.avoidOverwrite(
    Output.filePathFromOutputPath(Output.outputPath(), 'videos.json')
  );
  session =
    session ||
    (await PuppeteerSession.Fetchable.init(url, {
      logRequests: Workflow.logRequests()
    }));
  try {
    for (const category of await DatadirectPuppeteer.API.VideoCategory.categories(
      // FIXME do real pagination
      { session, payload: { pageNumber: 1, rowsPerPage: 1000 } }
    )) {
      const label = category.GroupName;
      const spinner = ora(label).start();
      const categoryIndex: AnnotatedVideoCategory = category;
      categoryIndex.video_items = [];
      const videos = await DatadirectPuppeteer.API.Video.list({
        session,
        pathParams: { VideoCategoryId: category.GroupId },
        payload: {
          active: true,
          future: true,
          expired: true,
          contextLabelId: 0,
          contextValue: 0
        }
      });
      for (const video of videos) {
        const videoIndex: AnnotatedVideo = video;
        videoIndex.file_path = await cachedDownload(video.FilenameUrl);
        videoIndex.cover_file_path = await cachedDownload(
          video.CoverFilenameUrl
        );
        categoryIndex.video_items.push(videoIndex);
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
  return session;
}
