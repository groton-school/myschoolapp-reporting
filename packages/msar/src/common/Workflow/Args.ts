import { defaults as flagDefaults } from './Args/flags.js';
import { defaults as optionsDefaults } from './Args/options.js';

export { flags } from './Args/flags.js';
export { options } from './Args/options.js';
export * from './Args/parse.js';

export const defaults = { ...flagDefaults, ...optionsDefaults };
