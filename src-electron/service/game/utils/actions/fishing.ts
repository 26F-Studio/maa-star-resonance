import type { Context } from '@maaxyz/maa-node';

const REEL_IN_CONTACT = 0;
const BOWING_CONTACT = 1;

export const startReelIn = async (context: Context) => {
  return context.tasker.controller?.post_touch_down(REEL_IN_CONTACT, 1160, 585, 1).wait().succeeded;
};

export const stopReelIn = async (context: Context) => {
  return context.tasker.controller?.post_touch_up(REEL_IN_CONTACT).wait().succeeded;
};

export const startBow = async (context: Context, direction: 'left' | 'right') => {
  return context.tasker.controller
    ?.post_touch_down(BOWING_CONTACT, direction === 'left' ? 150 : 320, 530, 1)
    .wait().succeeded;
};

export const stopBow = async (context: Context) => {
  return context.tasker.controller?.post_touch_up(BOWING_CONTACT).wait().succeeded;
};
