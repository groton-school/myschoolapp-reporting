import { PathString, URLString } from '@battis/descriptive-types';
import { Output } from '@msar/output';
import { SkyAPI } from '@oauth2-cli/sky-api';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import fs from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import {
  AnnotatedMediaItem,
  AnnotatedPhotoAlbum,
  AnnotatedPhotoCategory
} from './Annotations.js';

export type Index = AnnotatedPhotoCategory[];

type Options = {
  outputPath: string;
};

export async function download({ outputPath }: Options) {
  const index: Index = [];
  const indexPath = await Output.avoidOverwrite(
    path.join(outputPath, 'photoAlbums.json')
  );
  try {
    for await (const category of await SkyAPI.school.v1.contentmanagement.photoalbums.categories()) {
      const categorySpinner = ora(
        category.description || `Cateogry ${category.id}`
      ).start();
      const categoryIndex: AnnotatedPhotoCategory = category;
      categoryIndex.albums = [];
      for await (const album of await SkyAPI.school.v1.contentmanagement.photoalbums.list(
        {
          categories: [{ id: category.id }],
          show_secured: true
        }
      )) {
        const albumSpinner = ora(album.title || `Album ${album.id}`).start();
        const albumIndex: AnnotatedPhotoAlbum = album;
        albumIndex.media = [];
        if (album.id) {
          for await (const media of await SkyAPI.school.v1.contentmanagement.photoalbums.photosById(
            album.id
          )) {
            const mediaIndex: AnnotatedMediaItem = media;
            mediaIndex.file_path = await cachedDownload(outputPath, media.url);
            mediaIndex.thumbnail_file_path = await cachedDownload(
              outputPath,
              media.thumbnail_url
            );
            albumIndex.media?.push(mediaIndex);
          }
          albumSpinner.succeed();
        } else {
          albumSpinner.fail();
        }
        categoryIndex.albums.push(albumIndex);
      }
      categorySpinner.succeed();
      index.push(categoryIndex);
      await Output.writeJSON(indexPath, index, {
        overwrite: true,
        silent: true
      });
    }
  } catch (error) {
    Log.error({ error });
  } finally {
    await Output.writeJSON(indexPath, index, {
      overwrite: true
    });
  }
}

async function cachedDownload(outputPath: PathString, url?: URLString) {
  if (url) {
    const spinner = ora(url).start();
    if (/^\/\//.test(url)) {
      url = `https:${url}`;
    }
    const localPath = new URL(url).pathname.slice(1);
    if (fs.existsSync(path.join(outputPath, localPath))) {
      spinner.info(Colors.path(localPath, Colors.keyword));
      return localPath;
    } else {
      try {
        const filePath = await Output.writeFetchedFile({
          url,
          stream: (await fetch(url)).body as ReadableStream,
          outputPath
        });
        spinner.succeed(Colors.path(filePath, Colors.value));
        return filePath;
      } catch (error) {
        spinner.fail(Colors.error(`${error}: ${Colors.url(url)}`));
        return undefined;
      }
    }
  }
}
