import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import contentDisposition from 'content-disposition';
import path from 'node:path';

export const ContentDisposition = 'content-disposition';

type Options = {
  url: string;
  value?: string;
};

/**
 * Extract the filename from the Content-Disposition header, if present. Fall
 * back to the actual file name being fetched.
 */
export function filenameFromDisposition({ url, value }: Options): string {
  let filename = path.basename(new URL(url).pathname);
  if (value) {
    try {
      // FIXME why does content-disposition fail parsing so many times with Blackbaud?
      filename = contentDisposition.parse(value || '').parameters?.filename;
      Log.debug(`${url}: ${filename}`);
    } catch (error) {
      Log.warning(
        `Error parsing ${Colors.url(url)} {${ContentDisposition}: ${Colors.quotedValue(`"${value}"`)}}: ${Colors.error(error)}`
      );
    }
  }
  return filename;
}
