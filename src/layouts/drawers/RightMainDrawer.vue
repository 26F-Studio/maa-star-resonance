<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { bus } from 'boot/bus';
import { useConfigsStore } from 'stores/configs';
import { i18nSubPath, sanitizeNumberInput } from 'src/utils/common';

const i18n = i18nSubPath('layouts.drawers.RightMainDrawer');

const { gameServiceConfig } = storeToRefs(useConfigsStore());

const updateBeginChannel = (value: string | number | null) => {
  const sanitizedValue = sanitizeNumberInput(value, 1, 9999);
  gameServiceConfig.value.workflowConfig.broadcast.begin = sanitizedValue;
  if (gameServiceConfig.value.workflowConfig.broadcast.end < sanitizedValue) {
    gameServiceConfig.value.workflowConfig.broadcast.end = sanitizedValue;
  }
};

const updateEndChannel = (value: string | number | null) => {
  const sanitizedValue = sanitizeNumberInput(value, 1, 9999);
  gameServiceConfig.value.workflowConfig.broadcast.end = sanitizedValue;
  if (gameServiceConfig.value.workflowConfig.broadcast.begin > sanitizedValue) {
    gameServiceConfig.value.workflowConfig.broadcast.begin = sanitizedValue;
  }
};
</script>

<template>
  <q-drawer
    class="column q-gutter-y-md q-pa-md"
    behavior="desktop"
    bordered
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
    overlay
    side="right"
    :width="400"
    @show="bus.emit('drawer', 'open', 'right')"
    @hide="bus.emit('drawer', 'close', 'right')"
  >
    <div class="text-center text-h5">
      {{ i18n('labels.title') }}
    </div>
    <q-card>
      <q-card-section class="text-h6">
        {{ i18n('labels.broadcast') }}
      </q-card-section>
      <q-separator />
      <q-list separator>
        <q-item>
          <q-item-section>
            <q-item-label>
              {{ i18n('labels.beginChannel') }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-input
              input-class="text-right"
              maxlength="4"
              type="number"
              :model-value="gameServiceConfig.workflowConfig.broadcast.begin"
              @update:model-value="updateBeginChannel"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              {{ i18n('labels.endChannel') }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-input
              input-class="text-right"
              maxlength="4"
              type="number"
              :model-value="gameServiceConfig.workflowConfig.broadcast.end"
              @update:model-value="updateEndChannel"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-drawer>
</template>

<style scoped></style>
