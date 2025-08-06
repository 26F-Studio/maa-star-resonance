import type { api } from '@maaxyz/maa-node';
import { join, resolve } from 'path';
import { fileURLToPath } from 'node:url';

export const EMPTY_RECT: api.Rect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export const LOG_PATH = process.env.PROD
  ? join(process.resourcesPath, 'logs')
  : resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');

export const RESOURCES_PATH = process.env.PROD
  ? join(process.resourcesPath, 'maa-resources')
  : resolve(
      fileURLToPath(new URL('.', import.meta.url)),
      '../../src-electron/assets/maa-resources',
    );
