import type { NotifyOptions } from 'src/types/service/tray/types';

export interface TrayServiceTrait {
  notify(options: NotifyOptions): void;
}
