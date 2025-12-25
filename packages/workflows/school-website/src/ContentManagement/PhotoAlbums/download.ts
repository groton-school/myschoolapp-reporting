import { Output } from '@msar/output';
import { SkyAPI } from '@oauth2-cli/sky-api';
import { Log } from '@qui-cli/log';
import ora from 'ora';
import { cachedDownload } from '../../cachedDownload.js';
import {
  AnnotatedMediaItem,
  AnnotatedPhotoAlbum,
  AnnotatedPhotoCategory
} from './Annotations.js';

export type Index = AnnotatedPhotoCategory[];

export async function download() {
  const index: Index = [];
  const indexPath = await Output.avoidOverwrite(
    Output.filePathFromOutputPath(Output.outputPath(), 'photoAlbums.json')
  );
  try {
    for await (const category of await SkyAPI.school.v1.contentmanagement.photoalbums.categories()) {
      const label =
        category.description || `Photo Album Category ${category.id}`;
      const spinner = ora().start();
      const categoryIndex: AnnotatedPhotoCategory = category;
      categoryIndex.albums = [];
      for await (const album of await SkyAPI.school.v1.contentmanagement.photoalbums.list(
        {
          categories: [{ id: category.id }],
          show_secured: true
        }
      )) {
        spinner.text = `${label}: ${album.title || `Photo Album ${album.id}`}`;
        const albumIndex: AnnotatedPhotoAlbum = album;
        albumIndex.media = [];
        if (album.id) {
          for await (const media of await SkyAPI.school.v1.contentmanagement.photoalbums.photosById(
            album.id
          )) {
            const mediaIndex: AnnotatedMediaItem = media;
            mediaIndex.file_path = await cachedDownload(media.url);
            mediaIndex.thumbnail_file_path = await cachedDownload(
              media.thumbnail_url
            );
            albumIndex.media?.push(mediaIndex);
          }
        }
        categoryIndex.albums.push(albumIndex);
      }
      index.push(categoryIndex);
      await Output.writeJSON(indexPath, index, {
        overwrite: true,
        silent: true
      });
      spinner.succeed(label);
    }
  } catch (error) {
    Log.error({ error });
  } finally {
    await Output.writeJSON(indexPath, index, {
      overwrite: true
    });
  }
}
