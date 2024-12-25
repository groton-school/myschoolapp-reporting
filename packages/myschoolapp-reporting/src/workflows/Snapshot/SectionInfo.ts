import cli from '@battis/qui-cli';
import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import { Page } from 'puppeteer';

export type Data = types.datadirect.SectionInfoView.Item;

export async function capture(
  page: Page,
  sectionId: number,
  ignoreErrors = true
): Promise<Data | undefined> {
  cli.log.debug(`Group ${sectionId}: Start capturing section info`);
  try {
    return (
      await api.datadirect.SectionInfoView(page, {
        format: 'json',
        sectionId,
        associationId: 1
      })
    ).reduce(
      (sectionInfo: types.datadirect.SectionInfoView.Item | undefined, elt) => {
        if (!sectionInfo && elt.Id == sectionId) {
          return elt;
        }
        return sectionInfo;
      },
      undefined
    );
  } catch (error) {
    const message = `Group ${sectionId}: Error capturing section info: ${cli.colors.error(error || 'unknown')}`;
    if (ignoreErrors) {
      cli.log.error(message);
      return undefined;
    } else {
      throw new Error(message);
    }
  }
}
