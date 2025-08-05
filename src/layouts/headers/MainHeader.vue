<script setup lang="ts">
import { ref } from 'vue';

import { bus } from 'boot/bus';
import ThemeButton from 'components/ThemeButton.vue';
import { ServiceType } from 'src/types/service';
import { WindowType } from 'src/types/service/window/types';
import { i18nSubPath, useService } from 'src/utils/common';

const i18n = i18nSubPath('layouts.headers.MainHeader');
const windowService = useService(ServiceType.window);

const isFixed = ref(false);

const close = async () => {
  // TODO: Show confirmation dialog before closing
  await windowService.hideWindow(WindowType.main);
};

const minimize = async () => {
  await windowService.minimizeWindow(WindowType.main);
};

const toggleAlwaysOnTop = async () => {
  isFixed.value = !isFixed.value;
  await windowService.toggleAlwaysOnTopWindow(WindowType.main);
};

const toggleMaximize = async () => {
  await windowService.toggleMaximizeWindow(WindowType.main);
};
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-bar v-if="$q.platform.is.electron" class="q-electron-drag q-pr-none">
      <q-img src="logos/light/logo.svg" width="1.5rem" />
      <div>{{ i18n('labels.title') }}</div>
      <q-space />
      <q-btn
        flat
        :icon="isFixed ? 'mdi-pin' : 'mdi-pin-off'"
        stretch
        @click="() => toggleAlwaysOnTop()"
      >
        <q-tooltip :delay="1000">
          {{ isFixed ? i18n('tooltips.setAlwaysOnTop') : i18n('tooltips.unsetAlwaysOnTop') }}
        </q-tooltip>
      </q-btn>

      <q-btn flat icon="mdi-minus" stretch @click="minimize">
        <q-tooltip :delay="1000">
          {{ i18n('tooltips.minimize') }}
        </q-tooltip>
      </q-btn>
      <q-btn flat icon="crop_square" stretch @click="toggleMaximize">
        <q-tooltip :delay="1000">
          {{ i18n('tooltips.toggleMaximize') }}
        </q-tooltip>
      </q-btn>
      <q-btn class="close-button" flat icon="mdi-window-close" stretch @click="close">
        <q-tooltip :delay="1000">
          {{ i18n('tooltips.close') }}
        </q-tooltip>
      </q-btn>
    </q-bar>
    <q-toolbar>
      <q-btn dense flat icon="menu" round @click="bus.emit('drawer', 'toggle', 'left')" />
      <q-toolbar-title>
        {{ i18n('labels.title') }}
      </q-toolbar-title>
      <theme-button />
      <q-btn dense flat icon="menu" round @click="bus.emit('drawer', 'toggle', 'right')" />
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
