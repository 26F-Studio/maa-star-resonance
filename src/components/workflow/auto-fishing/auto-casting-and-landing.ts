import type { Pipeline } from 'src/types/service/maa/types';

export const AUTO_CASTING_AND_LANDING: Pipeline = {
  clickCastingButton: {
    next: ['doReelIn'],
    recognition: 'TemplateMatch',
    roi: [1084, 514, 150, 143],
    template: 'casting_button.png',
    threshold: 0.65,
    green_mask: true,
    post_delay: 4000,
    action: 'Click',
    target: [1160, 585, 1, 1],
  },
  doReelIn: {
    next: ['checkContinueFishing', 'checkCastingButton'],
    rate_limit: 1,
    recognition: 'ColorMatch',
    roi: [620, 357, 34, 32],
    method: 40,
    lower: [12, 250, 207],
    upper: [24, 255, 255],
    count: 16,
    action: 'Custom',
    custom_action: 'actReelIn',
  },
  checkContinueFishing: {
    recognition: 'OCR',
    roi: [964, 585, 192, 132],
    expected: '继续钓鱼',
  },
  checkCastingButton: {
    recognition: 'TemplateMatch',
    roi: [1084, 514, 150, 143],
    template: 'casting_button.png',
    green_mask: true,
  },
};
