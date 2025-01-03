import { api as types } from 'datadirect';
import { api } from 'datadirect-puppeteer';
import * as common from '../../../common.js';
import * as Base from './Base.js';

export type Data = types.datadirect.SectionInfoView.Item;

export const snapshot: Base.Snapshot<Data> = async ({
  groupId: sectionId,
  ignoreErrors = true,
  ...options
}): Promise<Data | undefined> => {
  common.Debug.withGroupId(sectionId, 'Start capturing section info');
  try {
    return (
      await api.datadirect.SectionInfoView({
        ...options,
        payload: {
          format: 'json',
          sectionId,
          associationId: 1
        }
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
    if (ignoreErrors) {
      common.Debug.errorWithGroupId(
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
