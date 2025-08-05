import { app, ipcMain, IpcMainInvokeEvent, Menu } from 'electron';
import log from 'electron-log';
import { inject, injectable } from 'inversify';
import { DateTime } from 'luxon';
import { exit } from 'node:process';
import { release, version } from 'os';

import packageJson from 'app/package.json';
import { getArbitraryService } from 'app/src-electron/service';
import { MaaService } from 'app/src-electron/service/maa';
import { TrayService } from 'app/src-electron/service/tray';
import type { WindowService } from 'app/src-electron/service/window';

import { ServiceType } from 'src/types/service';
import type { AppServiceTrait } from 'src/types/service/app';
import { WindowType } from 'src/types/service/window/types';

@injectable()
export class AppService implements AppServiceTrait {
  constructor(
    @inject(ServiceType.maa)
    private _maaService: MaaService,
    @inject(ServiceType.tray)
    private _trayService: TrayService,
    @inject(ServiceType.window)
    private _windowService: WindowService,
  ) {}

  init() {
    log.initialize();
    log.transports.file.format = '{text}';
    log.transports.file.transforms.push(({ data, message }) => {
      const { date, level, variables } = message;
      return [
        `[${DateTime.fromJSDate(date).toISO()}] ${variables?.processType}.${level.toUpperCase()}: `,
        ...data,
      ];
    });
    log.info('AppService init');
    this._initApplication();
    this._initIpc();
  }

  private _initApplication() {
    log.info(`OS version: ${version()} (${release()})`);
    Menu.setApplicationMenu(null);
    if (!app.requestSingleInstanceLock()) {
      app.quit();
      exit(-1);
    }
    app.setLoginItemSettings({
      openAtLogin: false,
    });
    app.on('second-instance', () => {
      app.focus();
      this._windowService.getWindow(WindowType.main).show();
    });
    app.whenReady().then(
      async () => {
        await this._maaService.create();
        log.info(`Service ${ServiceType.maa} started`);

        this._trayService.create();
        log.info(`Service ${ServiceType.tray} started`);

        this._windowService.getWindow(WindowType.main).create();
        log.info(`Service ${ServiceType.window} started`);

        log.info(`${packageJson.productName} is ready`);
      },
      () => {},
    );
  }

  private _initIpc() {
    ipcMain.handle(
      'service.invoke',
      <T extends ServiceType>(
        _: IpcMainInvokeEvent,
        serviceName: T,
        functionName: string,
        ...payloads: unknown[]
      ) => {
        const service = getArbitraryService(serviceName);
        const func = service[functionName];
        if (!func) {
          throw new Error(`Function ${functionName} not found in service ${serviceName}`);
        }
        if (typeof func === 'function') {
          return func.bind(service)(...payloads);
        }
        throw new Error(`Function ${functionName} in service ${serviceName} is not a function`);
      },
    );
  }
}
