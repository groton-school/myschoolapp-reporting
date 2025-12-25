import { URLString } from '@battis/descriptive-types';
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

async function cachedDownload(url?: URLString) {
  if (url) {
    const spinner = ora(url).start();
    if (/^\/\//.test(url)) {
      url = `https:${url}`;
    }
    const localPath = new URL(url).pathname.slice(1);
    if (fs.existsSync(path.join(Output.outputPath(), localPath))) {
      Log.debug(
        `Cached ${Colors.url(url)} already present at ${Colors.path(path.join(Output.outputPath(), localPath), Colors.keyword)}`
      );
      spinner.info(Colors.path(localPath, Colors.keyword));
      return localPath;
    } else {
      try {
        const filePath = await Output.writeFetchedFile({
          url,
          stream: (await fetch(url)).body as ReadableStream,
          outputPath: Output.outputPath()
        });
        Log.debug(
          `Downloaded ${Colors.url(url)} to ${Colors.path(filePath, Colors.keyword)}`
        );
        spinner.succeed(Colors.path(filePath, Colors.value));
        return filePath;
      } catch (error) {
        const message = Colors.error(`${error}: ${Colors.url(url)}`);
        Log.error(message);
        spinner.fail(message);
        return undefined;
      }
    }
  }
}
