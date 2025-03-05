import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import { api } from 'datadirect';
import * as Base from './Base.js';

export type Data = api.datadirect.SectionInfoView.Item;

export const snapshot: Base.Snapshot<Data> = async ({
  groupId: sectionId,
  ignoreErrors = true,
  ...options
}): Promise<Data | undefined> => {
  Debug.withGroupId(sectionId, 'Start capturing section info');
  try {
    return (
      await DatadirectPuppeteer.api.datadirect.SectionInfoView({
        ...options,
        payload: {
          format: 'json',
          sectionId,
          associationId: 1
        }
      })
    ).reduce(
      (sectionInfo: api.datadirect.SectionInfoView.Item | undefined, elt) => {
        if (!sectionInfo && elt.Id == sectionId) {
          return elt;
        }
        return sectionInfo;
      },
      undefined
    );
  } catch (error) {
    if (ignoreErrors) {
      Debug.errorWithGroupId(
        sectionId,
        'Error capturing section info',
        error as string
      );
      return undefined;
    } else {
      throw error;
    }
  }
};
