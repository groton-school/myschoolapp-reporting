import { hydrategradebook as Gradebook } from 'datadirect/dist/api/gradebook.js';
import { fetchViaPuppeteer } from './fetchViaPuppeteer.js';

export const hydrategradebook = fetchViaPuppeteer<
  Gradebook.Payload,
  Gradebook.Response
>(Gradebook);
