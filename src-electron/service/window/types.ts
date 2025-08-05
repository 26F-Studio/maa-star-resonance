import type { MainWindow } from 'app/src-electron/service/window/main';

import type { WindowType } from 'src/types/service/window/types';

export interface WindowTypeMapping {
  [WindowType.main]: MainWindow;
}
