import cli from '@battis/qui-cli';
import { api } from 'datadirect-puppeteer';
import { Page } from 'puppeteer';

export async function all(page: Page, year: string) {
  cli.log.debug(`Requesting list of all groups for ${year}`);
  return await api.datadirect.groupFinderByYear(page, {
    schoolYearLabel: year
  });
}
