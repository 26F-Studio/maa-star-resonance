import type { Pipeline } from 'src/types/service/maa/types';

export const OPEN_CHAT: Pipeline = {
  checkCurrentState: {
    next: ['clickPowerSaving', 'clickChatIcon', 'switchToWorldChat'],
  },
  clickPowerSaving: {
    next: ['clickChatIcon', 'switchToWorldChat'],
    recognition: 'OCR',
    roi: [483, 583, 312, 129],
    expected: '省电模式中，轻触可唤醒',
    action: 'Click',
  },
  clickChatIcon: {
    next: ['switchToWorldChat'],
    recognition: 'TemplateMatch',
    roi: [424, 542, 129, 127],
    template: 'chat_icon.png',
    green_mask: true,
    action: 'Click',
  },
  switchToWorldChat: {
    recognition: 'OCR',
    roi: [29, 43, 160, 138],
    expected: '世界',
    action: 'Click',
  },
};
