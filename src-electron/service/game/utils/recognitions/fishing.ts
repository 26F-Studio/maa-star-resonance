import type { Context } from '@maaxyz/maa-node';

import { runCustomRecognition } from 'app/src-electron/service/game/utils/common';

export const checkIfReeling = async (context: Context, image: ArrayBuffer): Promise<boolean> => {
  const result = await runCustomRecognition(context, image, {
    GameServiceCheckReeling: {
      recognition: 'TemplateMatch',
      roi: [425, 574, 47, 47],
      template: 'reeling_icon.png',
      green_mask: true,
    },
  });

  return !!result?.detail?.filtered?.length;
};

export const getBowDirection = async (
  context: Context,
  image: ArrayBuffer,
): Promise<'left' | 'right' | undefined> => {
  const [bowLeftResult, bowRightResult] = await Promise.all([
    runCustomRecognition(context, image, {
      GameServiceCheckBowLeft: {
        recognition: 'TemplateMatch',
        roi: [340, 320, 300, 80],
        template: 'bow_left.png',
        green_mask: true,
      },
    }),
    runCustomRecognition(context, image, {
      GameServiceCheckBowRight: {
        recognition: 'TemplateMatch',
        roi: [640, 320, 300, 80],
        template: 'bow_right.png',
        green_mask: true,
      },
    }),
  ]);

  if (bowLeftResult?.detail?.filtered?.length) {
    return 'left';
  }
  if (bowRightResult?.detail?.filtered?.length) {
    return 'right';
  }
};
