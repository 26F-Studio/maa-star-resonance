import { inject, injectable } from 'inversify';
import { app, Menu, MenuItemConstructorOptions, nativeImage, Tray } from 'electron';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';

import packageJson from 'app/package.json';
import type { WindowService } from 'app/src-electron/service/window';

import { ServiceType } from 'src/types/service';
import { TrayServiceTrait } from 'src/types/service/tray';
import { MenuEntry, NotifyOptions } from 'src/types/service/tray/types';
import { WindowType } from 'src/types/service/window/types';

@injectable()
export class TrayService implements TrayServiceTrait {
  private readonly _icon = nativeImage.createFromPath(
    resolve(
      fileURLToPath(new URL('.', import.meta.url)),
      process.env.PROD ? 'favicons/light.ico' : '../../public/favicons/light.ico',
    ),
  );
  private _menuEntryMap = new Map<MenuEntry, () => void>();
  private _tray: Tray | undefined;

  constructor(
    @inject(ServiceType.window)
    private _windowService: WindowService,
  ) {}

  notify(options: NotifyOptions) {
    this._tray?.displayBalloon({
      ...options,
      icon: this._icon,
    });
  }

  create() {
    if (this._tray) {
      return;
    }
    this._tray = new Tray(this._icon);
    this._tray.on('click', () => {
      this._windowService.showWindow(WindowType.main);
    });
    this._tray.setContextMenu(
      Menu.buildFromTemplate([
        this._createNormalItem(MenuEntry.About, 'About'),
        { type: 'separator' },
        this._createNormalItem(MenuEntry.Quit, 'Quit'),
      ]),
    );
    this._tray.setToolTip(`${packageJson.productName} v${packageJson.version}`);
    this.registerMenuEntry(MenuEntry.Quit, () => app.quit());
  }

  registerMenuEntry(entry: MenuEntry, callback: () => void) {
    this._menuEntryMap.set(entry, callback);
  }

  private _createNormalItem(menuEntry: MenuEntry, label: string): MenuItemConstructorOptions {
    return {
      label,
      type: 'normal',
      click: () => this._menuEntryMap.get(menuEntry)?.(),
    };
  }
}
