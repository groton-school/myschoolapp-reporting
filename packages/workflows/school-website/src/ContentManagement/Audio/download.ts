import { URLString } from '@battis/descriptive-types';
import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Output } from '@msar/output';
import { PuppeteerSession } from '@msar/puppeteer-session';
import { Workflow } from '@msar/workflow';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import ora from 'ora';
import { cachedDownload } from '../../cachedDownload.js';
import { AnnotatedAlbum, AnnotatedCategory } from './Annotations.js';

export type Index = AnnotatedCategory[];

export async function download(
  url: URLString,
  session?: PuppeteerSession.Authenticated
) {
  const index: Index = [];
  const indexPath = await Output.avoidOverwrite(
    Output.filePathFromOutputPath(Output.outputPath(), 'audio.json')
  );
  session =
    session ||
    (await PuppeteerSession.Fetchable.init(url, {
      logRequests: Workflow.logRequests()
    }));
  try {
    for (const category of await DatadirectPuppeteer.API.AudioCategory.categories(
      // FIXME do real pagination
      { session, payload: { pageNumber: 1, rowsPerPage: 1000 } }
    )) {
      const categoryIndex: AnnotatedCategory = category;
      categoryIndex.albums = [];
      const spinner = ora(category.GroupName).start();
      for (const album of await DatadirectPuppeteer.API.Audio.list({
        session,
        pathParams: { AudioCategoryId: category.GroupId },
        payload: {
          active: true,
          future: true,
          expired: true,
          contextLabelId: 0,
          contextValue: 0
        }
      })) {
        const albumIndex: AnnotatedAlbum =
          await DatadirectPuppeteer.API.Audio.edit({
            session,
            payload: { albumId: album.AlbumId, format: 'json' }
          });
        albumIndex.cover_file_path = await cachedDownload(
          albumIndex.CoverFilenameUrl
        );
        for (const photo of albumIndex.Photos || []) {
          photo.large_file_path = await cachedDownload(photo.LargeFilenameUrl);
          photo.large_file_edited_path = await cachedDownload(
            photo.LargeFilenameEditedUrl
          );
          photo.thumb_file_path = await cachedDownload(photo.ThumbFilenameUrl);
          photo.thumb_file_edited_path = await cachedDownload(
            photo.ThumbFilenameEditedUrl
          );
          photo.zoom_file_path = await cachedDownload(photo.ZoomFilenameUrl);
          photo.zoom_file_edited_path = await cachedDownload(
            photo.ZoomFilenameEditedUrl
          );
          photo.original_file_path = await cachedDownload(
            photo.OriginalFilenameUrl
          );
          photo.original_file_edited_path = await cachedDownload(
            photo.OriginalFilenameEditedUrl
          );
        }
        for (const file of albumIndex.Files || []) {
          file.file_path = await cachedDownload(file.FilenameUrl);
          file.file_edited_path = await cachedDownload(file.FilenameEditedUrl);
          file.thumb_file_path = await cachedDownload(file.ThumbFilenameUrl);
          file.thumb_file_edited_path = await cachedDownload(
            file.ThumbFilenameEditedUrl
          );
          file.transcript_file_path = await cachedDownload(
            file.TranscriptFilenameUrl
          );
          file.original_file_path = await cachedDownload(
            file.OriginalFilenameUrl
          );
          file.original_file_edited_Path = await cachedDownload(
            file.OriginalFilenameEditedUrl
          );
        }
        categoryIndex.albums.push(albumIndex);
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
