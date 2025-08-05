import { CustomActionSelf, Resource } from '@maaxyz/maa-node';
import log from 'electron-log';
import { injectable } from 'inversify';

import {
  startBow,
  startReelIn,
  stopBow,
  stopReelIn,
} from 'app/src-electron/service/game/utils/actions/fishing';
import { getScreenshot } from 'app/src-electron/service/game/utils/common';

import { GameServiceTrait } from 'src/types/service/game';
import {
  checkIfReeling,
  getBowDirection,
} from 'app/src-electron/service/game/utils/recognitions/fishing';
import { sleep } from 'src/utils/common';
import { clickByFlatRect } from 'app/src-electron/service/game/utils/actions/common';

@injectable()
export class GameService implements GameServiceTrait {
  private _currentBowDirection: 'left' | 'right' | undefined;
  private _isReelingIn = false;
  private _lastBowDirectionChangeTime = 0;

  constructor() {}

  updateConfig(): boolean {
    return false;
  }

  registerToResource(resource: Resource) {
    resource.register_custom_action('actEnsureBait', this._actEnsureBait.bind(this));
    resource.register_custom_action('actEnsureRod', this._actEnsureRod.bind(this));
    resource.register_custom_action('actReelIn', this._actReelIn.bind(this));
  }

  private async _actEnsureBait(self: CustomActionSelf): Promise<boolean> {
    const clickAddIconResult = await clickByFlatRect(self.context, [265, 637, 1, 1]);
    if (!clickAddIconResult) {
      log.error('Failed to click on the add icon for bait');
      return false;
    }
    const hasBait = true; // Replace with actual check
    await sleep(100); // Simulate some delay for checking bait
    console.log(self.id);
    if (!hasBait) {
      log.error('No bait available');
      return false;
    }
    log.info('Bait is available');
    return true;
  }

  private async _actEnsureRod(self: CustomActionSelf): Promise<boolean> {
    log.info('Ensuring rod...');
    // Implement the logic to ensure rod is available
    // This is a placeholder implementation
    const hasRod = true; // Replace with actual check
    await sleep(100); // Simulate some delay for checking rod
    console.log(self.id);
    if (!hasRod) {
      log.error('No rod available');
      return false;
    }
    log.info('Rod is available');
    return true;
  }

  private async _actReelIn(self: CustomActionSelf): Promise<boolean> {
    if (this._isReelingIn) {
      log.warn('Reeling in is already in progress');
      return false;
    }
    const result = await startReelIn(self.context);
    if (!result) {
      log.error('Failed to reel in');
      return false;
    }
    this._isReelingIn = true;
    log.info('Reeling in started');

    await sleep(3000); // Wait for 3 second before checking the reeling status

    const startTime = Date.now();
    const timeout = 60000; // 60 seconds timeout
    let isTimeout = true;
    while (Date.now() - startTime < timeout) {
      const screenshot = await getScreenshot(self.context);
      if (!screenshot) {
        log.error('Failed to take screenshot while reeling in');
        isTimeout = false;
        break;
      }
      const bowDirection = await getBowDirection(self.context, screenshot);
      if (bowDirection) {
        const currentTime = Date.now();
        if (!this._currentBowDirection && currentTime - this._lastBowDirectionChangeTime > 2500) {
          log.info(`Start bow direction: ${bowDirection}`);
          const startBowResult = await startBow(self.context, bowDirection);
          if (!startBowResult) {
            log.error('Failed to start bow action');
            isTimeout = false;
            break;
          }
          this._currentBowDirection = bowDirection;
          this._lastBowDirectionChangeTime = currentTime;
        } else if (
          this._currentBowDirection !== bowDirection &&
          currentTime - this._lastBowDirectionChangeTime > 2500
        ) {
          log.info(`Bow direction changed: ${bowDirection}, cancel current bow action`);
          const stopBowResult = await stopBow(self.context);
          if (!stopBowResult) {
            log.error('Failed to stop bow action');
            isTimeout = false;
            break;
          }
          this._currentBowDirection = undefined;
          this._lastBowDirectionChangeTime = currentTime;
        }
      }
      const isReeling = await checkIfReeling(self.context, screenshot);
      if (!isReeling) {
        log.info('Reeling in stopped, no reeling icon found');
        isTimeout = false;
        break;
      }
    }
    await this._cleanUp(self);
    if (isTimeout) {
      log.warn('Reeling in timed out after 60 seconds');
      return false;
    }
    log.info('Reeling in finished');
    return true;
  }

  private async _cleanUp(self: CustomActionSelf) {
    if (this._isReelingIn) {
      await stopReelIn(self.context);
      this._isReelingIn = false;
    }
    if (this._currentBowDirection) {
      await stopBow(self.context);
      this._currentBowDirection = undefined;
    }
    log.info('Cleaned up reeling in state');
  }
}
