import type { Pipeline } from 'src/types/service/maa/types';

export const CHECK_ACCESSORIES: Pipeline = {
  checkAccessories: {
    interrupt: ['finishCheckAccessories'],
    next: ['clickAddBait', 'clickAddRod'],
    timeout: 2000,
  },
  clickAddBait: {
    interrupt: ['finishCheckAccessories'],
    next: ['clickUseBait'],
    timeout: 2000,
    recognition: 'TemplateMatch',
    roi: [135, 607, 63, 60],
    template: 'add_icon.png',
    green_mask: true,
    action: 'Click',
  },
  clickUseBait: {
    next: ['clickAddRod'],
    timeout: 1000,
    recognition: 'OCR',
    roi: [548, 213, 151, 126],
    expected: '使用',
    action: 'Click',
  },
  clickAddRod: {
    interrupt: ['finishCheckAccessories'],
    next: ['clickUseRod'],
    timeout: 2000,
    recognition: 'TemplateMatch',
    roi: [232, 605, 65, 66],
    template: 'add_icon.png',
    green_mask: true,
    action: 'Click',
  },
  clickUseRod: {
    next: ['finishCheckAccessories'],
    timeout: 1000,
    recognition: 'OCR',
    roi: [650, 214, 149, 125],
    expected: '使用',
    action: 'Click',
  },
  finishCheckAccessories: {
    action: 'StopTask',
  },
};
