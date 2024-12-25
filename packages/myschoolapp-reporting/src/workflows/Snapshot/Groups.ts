import cli from '@battis/qui-cli';
import { api } from 'datadirect-puppeteer';
import { Page } from 'puppeteer';

export async function all(page: Page, year?: string) {
  cli.log.debug(`Requesting list of all groups for ${year}`);
  if (!year) {
    const now = new Date();
    if (now.getMonth() > 6) {
      year = `${now.getFullYear()}%20-%20${now.getFullYear() + 1}`;
    } else {
      year = `${now.getFullYear() - 1}%20-%20${now.getFullYear()}`;
    }
  }
  return await api.datadirect.groupFinderByYear(page, {
    schoolYearLabel: year
  });
}
