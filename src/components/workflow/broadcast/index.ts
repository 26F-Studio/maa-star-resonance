import type { Workflow } from 'components/workflow/types';
import { OPEN_CHAT } from 'components/workflow/broadcast/open-chat';
import { PASTE_AND_SEND_MESSAGE } from 'components/workflow/broadcast/paste-and-send-message';
import { SWITCH_CHANNEL } from 'components/workflow/broadcast/switch-channel';

export const BROADCAST: Workflow = {
  name: 'broadcast',
  icon: 'campaign',
  pipelines: [
    {
      name: 'openChat',
      icon: 'chat',
      data: OPEN_CHAT,
    },
    {
      name: 'switchChannel',
      icon: 'swap_horiz',
      data: SWITCH_CHANNEL,
    },
    {
      name: 'pasteAndSendMessage',
      icon: 'send',
      data: PASTE_AND_SEND_MESSAGE,
    },
  ],
};
