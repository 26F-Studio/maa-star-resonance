import type { Pipeline } from 'src/types/service/maa/types';

export const PASTE_AND_SEND_MESSAGE: Pipeline = {
  clickInputField: {
    next: ['inputMessage'],
    action: 'Click',
    target: [190, 680, 1, 1],
  },
  inputMessage: {
    next: ['clickPasteButton'],
    action: 'LongPress',
    target: [20, 680, 1, 1],
  },
  clickPasteButton: {
    next: ['clickConfirmButton'],
    recognition: 'OCR',
    roi: [0, 619, 153, 101],
    expected: '粘贴',
    action: 'Click',
  },
  clickConfirmButton: {
    next: ['clickSendButton'],
    recognition: 'OCR',
    roi: [1155, 617, 125, 103],
    expected: '确定',
    action: 'Click',
  },
  clickSendButton: {
    recognition: 'TemplateMatch',
    roi: [712, 611, 197, 109],
    template: 'chat_send_button.png',
    action: 'Click',
  },
};
