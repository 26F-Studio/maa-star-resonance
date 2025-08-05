import { BrowserWindow } from 'electron';
import Logger from 'electron-log';

import { DEFAULT_CONSTRUCT_OPTIONS } from 'app/src-electron/service/window/base/constants';
import type { ConstructOptions } from 'app/src-electron/service/window/base/types';

import { WINDOW_URL_MAPPING } from 'src/types/service/window/constants';
import type { WindowType } from 'src/types/service/window/types';

export abstract class BaseWindow {
  private readonly _constructOptions: ConstructOptions;
  private readonly _url: string;
  protected _window?: BrowserWindow | undefined;

  protected constructor(windowType: WindowType, constructOptions?: ConstructOptions) {
    this._constructOptions = {
      ...DEFAULT_CONSTRUCT_OPTIONS,
      ...constructOptions,
    };
    this._url = `${process.env.APP_URL}#${WINDOW_URL_MAPPING[windowType]}`;
  }

  create() {
    this._window = new BrowserWindow(this._constructOptions);
    this._window.on('closed', () => {
      this._window = undefined;
    });
    this._window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          'Access-Control-Allow-Origin': ['*'],
          'Access-Control-Allow-Headers': ['*'],
          ...details.responseHeaders,
        },
      });
    });
    this._window.once('ready-to-show', () => {
      if (this._window) {
        if (process.env.NODE_ENV === 'development') {
          this._window.webContents.openDevTools({ mode: 'detach' });
        }
      }
    });
    this._window.loadURL(this._url).catch((e) => Logger.warn('loadURL', e));

    return this._window;
  }

  close() {
    this._window?.close();
  }

  hide() {
    this._window?.hide();
  }

  minimize() {
    this._window?.minimize();
  }

  show(focused = true) {
    if (!this._window) {
      this._window = this.create();
    }

    this._window.show();
    this._window.moveTop();
    if (focused) {
      this._window.focus();
    }
  }

  toggleMaximize() {
    if (this._window) {
      if (this._window.isMaximized()) {
        this._window.unmaximize();
      } else {
        this._window.maximize();
      }
    }
  }

  toggleAlwaysOnTop() {
    if (this._window) {
      this._window.setAlwaysOnTop(!this._window.isAlwaysOnTop());
    }
  }
}
