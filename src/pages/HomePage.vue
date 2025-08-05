<script setup lang="ts">
import { ref } from 'vue';

import WorkflowCard from 'components/WorkflowCard.vue';

import type { AdbDevice } from 'src/types/service/maa/types';
import { i18nSubPath } from 'src/utils/common';
import AdbDeviceCard from 'components/AdbDeviceCard.vue';

const i18n = i18nSubPath('pages.HomePage');

const connectedDevice = ref<AdbDevice>();
</script>

<template>
  <q-page class="row justify-center q-pa-md-xl q-pa-md">
    <div class="col-grow column items-center justify-center q-gutter-y-md">
      <div class="text-h4 text-weight-regular">
        {{ i18n('labels.title') }}
      </div>
      <div class="col-grow row full-width q-gutter-x-md">
        <AdbDeviceCard class="col-auto" v-model="connectedDevice" />
        <WorkflowCard class="col-grow" :disabled="!connectedDevice" />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
