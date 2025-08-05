import type { api, Context, RecoDetail } from '@maaxyz/maa-node';
import Logger from 'electron-log';

import { EMPTY_RECT } from 'app/src-electron/service/maa/constants';

import type {
  PipelineOverrideAction,
  PipelineOverrideRecognition,
} from 'src/types/service/maa/types';

export const getScreenshot = async (context: Context): Promise<ArrayBuffer | null | undefined> => {
  await context.tasker.controller?.post_screencap().wait();
  return context.tasker.controller?.cached_image;
};

export const runCustomAction = async (
  context: Context,
  pipelineOverride: PipelineOverrideAction,
): Promise<boolean> => {
  const pipelineBeginNodeName = Object.keys(pipelineOverride)[0];
  if (!pipelineBeginNodeName) {
    Logger.error('No pipeline override provided');
    return false;
  }
  return !!(await context.run_action(pipelineBeginNodeName, EMPTY_RECT, '', pipelineOverride))
    ?.completed;
};

export const runCustomRecognition = async (
  context: Context,
  image: ArrayBuffer | Buffer,
  pipelineOverride: PipelineOverrideRecognition,
) => {
  const pipelineBeginNodeName = Object.keys(pipelineOverride)[0];
  if (!pipelineBeginNodeName) {
    Logger.error('No pipeline override provided');
    return null;
  }
  return await context.run_recognition(pipelineBeginNodeName, image, pipelineOverride);
};

export const removeDuplicateDetails = (
  details: RecoDetail['filtered'] | undefined,
  threshold: api.FlatRect,
): RecoDetail['filtered'] => {
  const result: RecoDetail['filtered'] = [];
  if (!details || details.length === 0) {
    return result;
  }
  for (const current of details) {
    let isUnique = true;
    for (const existing of result) {
      if (
        Math.abs(current.box[0] - existing.box[0]) < threshold[0] &&
        Math.abs(current.box[1] - existing.box[1]) < threshold[1] &&
        Math.abs(current.box[2] - existing.box[2]) < threshold[2] &&
        Math.abs(current.box[3] - existing.box[3]) < threshold[3]
      ) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) {
      result.push(current);
    }
  }

  return result;
};
