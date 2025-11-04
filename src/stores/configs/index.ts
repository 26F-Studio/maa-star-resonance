import { reactive } from 'vue';
import { defineStore } from 'pinia';

import type { GameServiceConfig } from 'src/types/service/game/types';

export const useConfigsStore = defineStore(
  'configs',
  () => {
    const gameServiceConfig = reactive<GameServiceConfig>({
      workflowConfig: {
        broadcast: {
          begin: 1,
          end: 9999,
        },
      },
    });
    return { gameServiceConfig };
  },
  { persist: true },
);
