import { AssessmentGetSpa as A } from 'datadirect/dist/api/assessment.js';
import { fetchViaPuppeteer } from './fetchViaPuppeteer.js';

export const AssessmentGetSpa = fetchViaPuppeteer<A.Payload, A.Response>(A);
