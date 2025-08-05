import type { Pipeline } from 'src/types/service/maa/types';

export const START_FISHING: Pipeline = {
  checkCurrentState: {
    next: ['clickPowerSaving', 'clickContinueFishing', 'clickFishingAction', 'checkCastingButton'],
  },
  clickPowerSaving: {
    next: ['clickContinueFishing', 'clickFishingAction', 'checkCastingButton'],
    recognition: 'OCR',
    roi: [483, 583, 312, 129],
    expected: '省电模式中，轻触可唤醒',
    action: 'Click',
  },
  clickContinueFishing: {
    next: ['checkCastingButton'],
    recognition: 'OCR',
    roi: [964, 585, 192, 132],
    expected: '继续钓鱼',
    action: 'Click',
  },
  clickFishingAction: {
    next: ['checkCastingButton'],
    recognition: 'OCR',
    roi: [822, 277, 149, 135],
    expected: '钓鱼',
    action: 'Click',
  },
  checkCastingButton: {
    recognition: 'TemplateMatch',
    roi: [1084, 514, 150, 143],
    template: 'casting_button.png',
    green_mask: true,
  },
};
