import { fileURLToPath } from 'node:url';
import { join, resolve } from 'path';

import type { ConstructOptions } from 'app/src-electron/service/window/base/types';

export const DEFAULT_CONSTRUCT_OPTIONS: ConstructOptions = {
  icon: resolve(fileURLToPath(new URL('.', import.meta.url)), 'icons/icon.png'),
  width: 1000,
  height: 600,
  useContentSize: true,
  fullscreenable: false,
  frame: false,
  storePosition: false,
  webPreferences: {
    contextIsolation: true,
    devTools: process.env.NODE_ENV === 'development',
    preload: resolve(
      fileURLToPath(new URL('.', import.meta.url)),
      join(
        process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
        'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
      ),
    ),
  },
};
