import type { BrowserWindowConstructorOptions } from 'electron';

export interface ConstructOptions extends BrowserWindowConstructorOptions {
  storePosition?: boolean;
}
