<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref, toRaw } from 'vue';

import { ServiceType } from 'src/types/service';
import type { AdbDevice } from 'src/types/service/maa/types';
import { i18nSubPath, useService } from 'src/utils/common';

const i18n = i18nSubPath('components.AdbDeviceCard');
const { notify } = useQuasar();
const maaService = useService(ServiceType.maa);

const connectedDevice = defineModel<AdbDevice | undefined>({ required: true });

const adbDevices = ref<AdbDevice[]>([]);
const isProcessing = ref(false);

const connect = async (device: AdbDevice) => {
  if (connectedDevice.value?.address === device.address) {
    return;
  }

  if (!(await disconnect())) {
    return;
  }

  isProcessing.value = true;
  notify({
    type: 'info',
    message: i18n('notifications.connecting', { deviceName: device.name }),
    caption: device.address,
  });
  if (await maaService.connect(toRaw(device))) {
    connectedDevice.value = device;
    notify({
      type: 'positive',
      message: i18n('notifications.connectSuccess', { deviceName: device.name }),
      caption: device.address,
    });
  } else {
    connectedDevice.value = undefined;
    notify({
      type: 'negative',
      message: i18n('notifications.connectError', { deviceName: device.name }),
      caption: device.address,
    });
  }
  isProcessing.value = false;
};

const disconnect = async () => {
  let isSuccess = true;
  if (!connectedDevice.value) {
    return isSuccess;
  }

  isProcessing.value = true;
  notify({
    type: 'info',
    message: i18n('notifications.disconnecting', { deviceName: connectedDevice.value.name }),
    caption: connectedDevice.value.address,
  });
  if (await maaService.disconnect()) {
    notify({
      type: 'positive',
      message: i18n('notifications.disconnectSuccess', { deviceName: connectedDevice.value.name }),
      caption: connectedDevice.value.address,
    });
    connectedDevice.value = undefined;
  } else {
    notify({
      type: 'negative',
      message: i18n('notifications.disconnectError', { deviceName: connectedDevice.value.name }),
      caption: connectedDevice.value.address,
    });
    isSuccess = false;
  }
  isProcessing.value = false;

  return isSuccess;
};

onMounted(async () => {
  try {
    adbDevices.value = await maaService.listDevices();
  } catch (error) {
    console.error('Failed to fetch ADB devices:', error);
  }
});
</script>

<template>
  <q-card bordered flat class="column">
    <q-card-section>
      <div class="text-weight-medium q-mx-lg">
        {{ i18n('labels.title') }}
      </div>
    </q-card-section>
    <q-separator />
    <q-scroll-area class="col-grow">
      <q-list separator>
        <q-item
          v-for="(device, index) in adbDevices"
          :key="index"
          :active="connectedDevice?.address === device.address"
          :clickable="!isProcessing"
          tag="label"
          @click="connect(device)"
        >
          <q-item-section>
            <q-item-label>
              {{ device.name }}
            </q-item-label>
            <q-item-label caption>
              {{ device.address }}
            </q-item-label>
          </q-item-section>
          <q-tooltip>
            <div class="text-caption">ADB Path: {{ device.adb_path }}</div>
            <div class="text-caption">Config: {{ device.config }}</div>
            <div class="text-caption">Screencap Methods: {{ device.screencap_methods }}</div>
            <div class="text-caption">Input Methods: {{ device.input_methods }}</div>
          </q-tooltip>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-separator />
    <q-card-actions align="center">
      <q-btn
        color="negative"
        :disable="!connectedDevice"
        :label="i18n('labels.disconnect')"
        no-caps
        @click="disconnect"
      />
    </q-card-actions>
    <q-inner-loading :showing="isProcessing">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<style scoped></style>
