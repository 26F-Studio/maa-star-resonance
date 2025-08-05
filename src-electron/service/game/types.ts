import type { api } from '@maaxyz/maa-node';

export type RecognizerResult = Promise<[out_box: api.Rect, out_detail: string] | null>;
