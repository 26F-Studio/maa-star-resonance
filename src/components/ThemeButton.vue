<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { i18nSubPath } from 'src/utils/common';
import { useSettingsStore } from 'stores/settings';

const { toggleTheme } = useSettingsStore();
const { themeProps } = storeToRefs(useSettingsStore());

const i18n = i18nSubPath('components.ThemeButton');
</script>

<template>
  <q-btn :icon="themeProps.icon" :text-color="themeProps.color" flat round @click="toggleTheme">
    <q-tooltip
      class="text-no-wrap"
      anchor="center right"
      self="center left"
      transition-hide="jump-left"
      transition-show="jump-right"
    >
      {{ i18n('labels.switchTheme') }}
    </q-tooltip>
  </q-btn>
</template>

<style scoped></style>
