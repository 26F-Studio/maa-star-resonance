import { injectable } from 'inversify';

import { BaseWindow } from 'app/src-electron/service/window/base';
import { MainWindow } from 'app/src-electron/service/window/main';
import { WindowTypeMapping } from 'app/src-electron/service/window/types';

import type { WindowServiceTrait } from 'src/types/service/window';
import { WindowType } from 'src/types/service/window/types';

@injectable()
export class WindowService implements WindowServiceTrait {
  windowMap = new Map<WindowType, BaseWindow>();

  constructor() {
    this.windowMap.set(WindowType.main, new MainWindow());
  }

  closeWindow<T extends WindowType>(windowType: T): void {
    this.getWindow(windowType)?.close();
  }

  hideWindow<T extends WindowType>(windowType: T): void {
    this.getWindow(windowType)?.hide();
  }

  minimizeWindow<T extends WindowType>(windowType: T): void {
    this.getWindow(windowType)?.minimize();
  }

  showWindow<T extends WindowType>(windowType: T): void {
    this.getWindow(windowType)?.show();
  }

  toggleAlwaysOnTopWindow<T extends WindowType>(windowType: T): void {
    this.getWindow(windowType)?.toggleAlwaysOnTop();
  }

  toggleMaximizeWindow<T extends WindowType>(windowType: T): void {
    this.getWindow(windowType)?.toggleMaximize();
  }

  getWindow<T extends WindowType>(type: T): WindowTypeMapping[T] {
    const window = this.windowMap.get(type);
    if (!window) {
      throw new Error(`Window of type ${type} not found`);
    }
    return window as unknown as WindowTypeMapping[T];
  }
}
