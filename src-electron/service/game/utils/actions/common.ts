import type { api, Context } from '@maaxyz/maa-node';

import { runCustomAction } from 'app/src-electron/service/game/utils/common';

export const clickByFlatRect = async (
  context: Context,
  flatRect: api.FlatRect,
): Promise<boolean> => {
  return await runCustomAction(context, {
    GameServiceClick: {
      action: 'Click',
      target: flatRect,
    },
  });
};
