import type { GameServiceConfig } from 'src/types/service/game/types';

export interface GameServiceTrait {
  updateConfig(config: GameServiceConfig): boolean;
}
