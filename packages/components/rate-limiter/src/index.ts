import { register } from '@battis/qui-cli.plugin';
import * as RateLimiter from './RateLimiter.js';

await register(RateLimiter);
export { RateLimiter };
