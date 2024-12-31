import { defaults as flagDefaults } from './args/flags.js';
import { defaults as optionsDefaults } from './args/options.js';

export { flags } from './args/flags.js';
export { options } from './args/options.js';
export * from './args/parse.js';

export const defaults = { ...flagDefaults, ...optionsDefaults };
