<script setup lang="ts">
import { bus } from 'boot/bus';

</script>

<template>
  <q-drawer
    behavior="desktop"
    bordered
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
    overlay
    side="right"
    @show="bus.emit('drawer', 'open', 'right')"
    @hide="bus.emit('drawer', 'close', 'right')"
  >
    <q-list separator>
    </q-list>
  </q-drawer>
</template>

<style scoped></style>
