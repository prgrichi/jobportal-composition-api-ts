<template>
  <!-- Dark Mode Toggle -->
  <ToggleSwitch v-model="darkMode" label="Dark Mode" />

  <div class="flex flex-1 justify-end items-center gap-4">
    <!-- Welcome User -->
    <UserGreeting />

    <!-- Language Switcher -->
    <LanguageSwitcher />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeStore } from '@/stores/ui/theme';

import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher.vue';
import UserGreeting from '@/components/auth/UserGreeting.vue';

const themeStore = useThemeStore();

const darkMode = computed({
  get() {
    return themeStore.isDark;
  },
  set(_value) {
    themeStore.toggle();
  },
});
</script>

<style scoped></style>
