import { register } from '@qui-cli/plugin';
import * as SchoolWebsite from './SchoolWebsite.js';

export { SchoolWebsite };

await register(SchoolWebsite);
