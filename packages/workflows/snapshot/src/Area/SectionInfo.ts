import { DatadirectPuppeteer } from '@msar/datadirect-puppeteer';
import { Debug } from '@msar/debug';
import * as Snapshot from '@msar/types.snapshot';
import { Workflow } from '@msar/workflow';
import { api } from 'datadirect';
import * as Base from './Base.js';
import { merge } from './merge.js';

export const snapshot: Base.Snapshot<Snapshot.SectionInfo.Data> = async (
  { groupId: sectionId, ignoreErrors = Workflow.ignoreErrors(), ...options },
  prev?: Snapshot.SectionInfo.Data
): Promise<Snapshot.SectionInfo.Data | undefined> => {
  Debug.withGroupId(sectionId, 'Start capturing section info');
  try {
    const SectionInfo = (
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
    if (prev && SectionInfo) {
      return merge(prev, SectionInfo);
    }
    return SectionInfo;
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
