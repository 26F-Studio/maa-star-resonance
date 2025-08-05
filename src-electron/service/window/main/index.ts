import { BaseWindow } from 'app/src-electron/service/window/base';

import { WindowType } from 'src/types/service/window/types';

export class MainWindow extends BaseWindow {
  constructor() {
    super(WindowType.main, {
      storePosition: true,
      width: 1200,
      height: 800,
      useContentSize: true,
      frame: false,
    });
  }
}
