import cli from '@battis/qui-cli';

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
  cli.log.debug('🐞 ' + formatWithGroupId(groupId, base, message));
}

export function errorWithGroupId(
  groupId: number | string,
  base: string,
  message?: string
) {
  cli.log.error(
    '🚨 ' + formatWithGroupId(groupId, base, cli.colors.error(message))
  );
}
