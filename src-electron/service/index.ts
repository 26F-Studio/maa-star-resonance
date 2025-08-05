import { Container } from 'inversify';
import 'reflect-metadata';

import { AppService } from 'app/src-electron/service/app';
import { GameService } from 'app/src-electron/service/game';
import { MaaService } from 'app/src-electron/service/maa';
import { TrayService } from 'app/src-electron/service/tray';
import { WindowService } from 'app/src-electron/service/window';

import { ServiceType } from 'src/types/service';

const container = new Container({
  defaultScope: 'Singleton',
});

export interface ServiceMapping {
  [ServiceType.app]: AppService;
  [ServiceType.game]: GameService;
  [ServiceType.maa]: MaaService;
  [ServiceType.tray]: TrayService;
  [ServiceType.window]: WindowService;
}

export const initContainer = () => {
  container.bind(ServiceType.app).to(AppService);
  container.bind(ServiceType.game).to(GameService);
  container.bind(ServiceType.maa).to(MaaService);
  container.bind(ServiceType.tray).to(TrayService);
  container.bind(ServiceType.window).to(WindowService);
};

export const getArbitraryService = <T extends keyof ServiceMapping>(serviceType: T) => {
  return container.get<{
    [key: string]: unknown;
  }>(serviceType);
};

export const getService = <T extends ServiceType>(serviceType: T) => {
  return container.get<ServiceMapping[T]>(serviceType);
};
