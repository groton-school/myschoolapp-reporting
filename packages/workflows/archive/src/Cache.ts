import { JSONValue } from '@battis/typescript-tricks';
import * as Archive from '@msar/types.archive';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import { EventEmitter } from 'node:events';

export type DownloadData = {
  localPath: string;
  filename?: string;
  error?: never;
};
export type DownloadError = {
  localPath?: never;
  filename?: never;
  error: string;
};
export type Item = {
  original: string;
  accessed: Date;
} & (DownloadData | DownloadError);

const AWAITING = true;
const cache: Record<string, Archive.Annotation | typeof AWAITING> = {};
const ready = new EventEmitter();
ready.setMaxListeners(1000);

export async function get(
  url: string,
  downloader: () => Promise<Archive.Annotation>
): Promise<Archive.Annotation> {
  url = normalizeURL(url);
  if (url in cache) {
    if (cache[url] === AWAITING) {
      return new Promise((resolve) => {
        ready.on(url, () => resolve(cache[url] as Archive.Annotation));
      });
    }
    return cache[url] as Archive.Annotation;
  } else {
    cache[url] = AWAITING;
    cache[url] = await downloader();
    ready.emit(url);
    return cache[url] as Archive.Annotation;
  }
}

function normalizeURL(url: string) {
  const normalized = url
    .replace(/^(\/.+\?.*)(w|h)=\dpx&?(.*)$/, '$1$3')
    .replace(/\?$/, '');
  if (normalized !== url) {
    Log.debug(`${Colors.url(url)} normalized to ${Colors.url(normalized)}`);
  }
  return normalized;
}

export function build(index: Archive.Multiple.Data) {
  function spider(component: JSONValue) {
    let result = component;
    if (Array.isArray(component)) {
      result = [];
      for (const elt of component) {
        result.push(spider(elt));
      }
    } else if (typeof component === 'object' && component !== null) {
      if (Archive.isAnnotated(component)) {
        if ('localPath' in component) {
          cache[component.original] = component;
        } else if ('error' in component) {
          result = (component as Archive.Annotation).original;
        }
      } else {
        for (const key of Object.keys(component)) {
          // FIXME address typing more carefully
          // @ts-expect-error 7054
          result[key] = spider(component[key]);
        }
      }
    }
    return result;
  }

  if (!Array.isArray(index)) {
    console.log(index);
    throw new Error();
  }
  return spider(index) as Archive.Multiple.Data;
}
