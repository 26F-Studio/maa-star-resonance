<script setup lang="ts">
import { onMounted } from 'vue';

import { useSettingsStore } from 'stores/settings';

const { applyTheme } = useSettingsStore();

onMounted(() => {
  applyTheme();
});
</script>
<template>
  <router-view />
</template>
