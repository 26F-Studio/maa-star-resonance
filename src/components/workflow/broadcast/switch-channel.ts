import type { Pipeline } from 'src/types/service/maa/types';

export const SWITCH_CHANNEL: Pipeline = {
  openWorldSwitchMenu: {
    next: ['inputChannelNumber'],
    recognition: 'OCR',
    roi: [115, 0, 152, 136],
    expected: '世界',
    action: 'Click',
  },
  inputChannelNumber: {
    next: ['clickConfirmButton'],
    action: 'Custom',
    custom_action: 'actInputChannelNumber',
  },
  clickConfirmButton: {
    next: [],
    recognition: 'OCR',
    roi: [286, 142, 146, 131],
    expected: 'OK',
    action: 'Click',
  },
};
