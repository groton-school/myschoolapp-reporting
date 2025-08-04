import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';

export const name = '@msar/debug';

export function format(base: string, message?: string) {
  return `${base}${message ? `: ${message}` : '.'}`;
}

export class CustomError extends Error {
  public constructor(base: string, message?: string) {
    super(format(base, message));
  }
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
