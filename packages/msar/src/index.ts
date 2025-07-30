import { build } from '@battis/qui-cli.structured';
import path from 'node:path';

build({
  fileName: import.meta.filename,
  commandDirPath: path.join(import.meta.dirname, 'commands')
});
