import type { RouteRecordRaw } from 'vue-router';

import { WINDOW_URL_MAPPING } from 'src/types/service/window/constants';
import { WindowType } from 'src/types/service/window/types';

const routes: RouteRecordRaw[] = [
  {
    path: WINDOW_URL_MAPPING[WindowType.main],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: `${WINDOW_URL_MAPPING[WindowType.main]}/workflow`,
      },
      {
        name: 'workflow',
        path: 'workflow',
        components: {
          default: () => import('pages/WorkflowPage.vue'),
          leftDrawer: () => import('layouts/drawers/LeftMainDrawer.vue'),
          rightDrawer: () => import('layouts/drawers/RightMainDrawer.vue'),
          header: () => import('layouts/headers/MainHeader.vue'),
        },
      },
    ],
  },

  // Always leave this as the last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
