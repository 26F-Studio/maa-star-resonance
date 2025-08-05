<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { bus } from 'boot/bus';

interface Navigation {
  label: string;
  icon: string;
  available: boolean;
  route: string;
}

const { t } = useI18n();

const i18n = (relativePath: string) => {
  return t('layouts.drawers.LeftMainDrawer.' + relativePath);
};

const navigations: Navigation[] = [
  {
    label: 'workflow',
    icon: 'mdi-graph',
    available: true,
    route: 'workflow',
  },
];
</script>

<template>
  <q-drawer
    behavior="desktop"
    bordered
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
    overlay
    side="left"
    @show="bus.emit('drawer', 'open', 'left')"
    @hide="bus.emit('drawer', 'close', 'left')"
  >
    <q-list separator>
      <template v-for="navigation in navigations" :key="navigation">
        <q-item :disable="!navigation.available" exact :to="navigation.route">
          <q-item-section avatar>
            <q-icon :name="navigation.icon" :color="navigation.available ? 'primary' : 'grey'" />
          </q-item-section>
          <q-item-section :class="navigation.available ? '' : 'text-grey'">
            {{ i18n('labels.' + navigation.label) }}
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<style scoped></style>
