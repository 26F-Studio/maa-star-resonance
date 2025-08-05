import type { WindowType } from 'src/types/service/window/types';

export interface WindowServiceTrait {
  closeWindow<T extends WindowType>(windowType: T): void;

  hideWindow<T extends WindowType>(windowType: T): void;

  minimizeWindow<T extends WindowType>(windowType: T): void;

  showWindow<T extends WindowType>(windowType: T): void;

  toggleAlwaysOnTopWindow<T extends WindowType>(windowType: T): void;

  toggleMaximizeWindow<T extends WindowType>(windowType: T): void;
}
