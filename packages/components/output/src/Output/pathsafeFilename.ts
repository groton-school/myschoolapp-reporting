import path from 'node:path';

export function pathsafeFilename(filename: string) {
  const ext = path.extname(filename);
  const base = filename.replace(new RegExp(`(.+)${ext}$`), '$1');
  return `${base.replace(/[.:/]+/i, '-')}${ext}`;
}
