import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';

export { CustomError } from './CustomError.js';

export const name = '@msar/debug';
export const src = import.meta.dirname;

export function format(base: string, message?: string) {
  return `${base}${message ? `: ${message}` : '.'}`;
}

export function formatWithGroupId(
  groupId: number | string,
  base: string,
  message?: string
) {
  return `Group ${groupId}: ${format(base, message)}`;
}

export function withGroupId(
  groupId: number | string,
  base: string,
  message?: string
) {
  Log.debug('🐞 ' + formatWithGroupId(groupId, base, message));
}

export function errorWithGroupId(
  groupId: number | string,
  base: string,
  message?: string
) {
  Log.error('🚨 ' + formatWithGroupId(groupId, base, Colors.error(message)));
}
