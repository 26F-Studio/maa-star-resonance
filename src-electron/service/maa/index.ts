import { AdbController, Global, Resource, Tasker } from '@maaxyz/maa-node';
import log from 'electron-log';
import { inject, injectable } from 'inversify';

import { GameService } from 'app/src-electron/service/game';
import { LOG_PATH, RESOURCES_PATH } from 'app/src-electron/service/maa/constants';

import { MaaServiceTrait } from 'src/types/service/maa';
import { AdbDevice, Pipeline } from 'src/types/service/maa/types';
import { isValidIpPort } from 'src/utils/common';
import { ServiceType } from 'src/types/service';

@injectable()
export class MaaService implements MaaServiceTrait {
  private _adbController?: AdbController | undefined;
  private _connecting = false;
  private _resource = new Resource();

  constructor(
    @inject(ServiceType.game)
    private _gameService: GameService,
  ) {
    Global.log_dir = LOG_PATH;
    Global.stdout_level = 'Off';
    this._resource.notify = (message, details) => {
      log.info(message, details);
    };
  }

  async listDevices(): Promise<AdbDevice[]> {
    const devices = await AdbController.find();
    return (
      devices
        ?.map((device) => ({
          name: device[0],
          adb_path: device[1],
          address: device[2],
          screencap_methods: device[3],
          input_methods: device[4],
          config: device[5],
        }))
        .filter((device) => isValidIpPort(device.address))
        .reduce((acc, item) => {
          if (!acc.some((d) => d.address === item.address)) {
            acc.push(item);
          }
          return acc;
        }, new Array<AdbDevice>()) ?? []
    );
  }

  async connect(device: AdbDevice): Promise<boolean> {
    if (!isValidIpPort(device.address)) {
      throw new Error('Invalid device address');
    }
    log.info(`Switching to device: ${device.name} (${device.address})`);
    if (this._adbController) {
      this._adbController.destroy();
    }
    this._adbController = new AdbController(
      device.adb_path,
      device.address,
      device.screencap_methods,
      device.input_methods,
      device.config,
    );

    return new Promise((resolve, reject) => {
      this._adbController!.notify = (message, details) => {
        const data: { action: string; uuid: string } = JSON.parse(details);
        switch (data.action) {
          case 'connect': {
            if (message === 'Controller.Action.Succeeded') {
              log.info(`Connected to device: ${device.name} (${device.address})`, data);
              this._connecting = false;
              resolve(true);
            } else if (message === 'Controller.Action.Failed') {
              log.error(`Failed to connect to device: ${device.name} (${device.address})`, data);
              this._connecting = false;
              reject(new Error(`Failed to connect to device: ${device.name}`));
            }
            break;
          }
          case 'screencap': {
            if (message === 'Controller.Action.Failed') {
              log.error(
                `Failed to capture screen on device: ${device.name} (${device.address})`,
                data,
              );
            }
            break;
          }
          case 'touch_down': {
            if (message === 'Controller.Action.Succeeded') {
              log.info(`Touched down on device: ${device.name} (${device.address})`, data);
            } else if (message === 'Controller.Action.Failed') {
              log.error(`Failed to touch down on device: ${device.name} (${device.address})`, data);
            }
            break;
          }
          case 'touch_up': {
            if (message === 'Controller.Action.Succeeded') {
              log.info(`Touched up on device: ${device.name} (${device.address})`, data);
            } else if (message === 'Controller.Action.Failed') {
              log.error(`Failed to touch up on device: ${device.name} (${device.address})`, data);
            }
            break;
          }
          default: {
            log.warn(`Unknown Maa action: ${data.action}`, data, message);
            break;
          }
        }
      };

      try {
        this._connecting = true;
        this._adbController!.post_connection();
      } catch (error) {
        this._connecting = false;
        this._adbController!.destroy();
        this._adbController = undefined;
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  disconnect() {
    if (this._connecting) {
      log.warn('Disconnecting while still connecting');
      return false;
    }
    if (this._adbController) {
      this._adbController.notify = () => {};
      this._adbController.destroy();
      this._adbController = undefined;
      return true;
    }
    return false;
  }

  async runExistPipeline(pipelineName: string): Promise<boolean> {
    const tasker = await this._createTasker();
    return await tasker.post_task(pipelineName).wait().succeeded;
  }

  async runNewPipeline(pipeline: Pipeline): Promise<boolean> {
    const tasker = await this._createTasker();
    return await tasker.post_task(Object.keys(pipeline)[0]!, pipeline).wait().succeeded;
  }

  async create() {
    // Global.show_hit_draw = true;
    this._gameService.registerToResource(this._resource);
    return await this._resource.post_bundle(RESOURCES_PATH).wait().succeeded;
  }

  private async _createTasker() {
    if (!this._adbController) {
      throw new Error('Not connected to any device');
    }
    if (!this._resource.loaded) {
      log.warn('Resource not loaded, creating resource bundle');
      const created = await this.create();
      if (!created) {
        throw new Error('Failed to create resource bundle');
      }
    }
    const tasker = new Tasker();
    tasker.notify = (message, details) => {
      log.info(message, details);
    };
    tasker.bind(this._adbController);
    tasker.bind(this._resource);

    if (!tasker.inited) {
      throw new Error('Tasker not initialized');
    }
    return tasker;
  }
}
