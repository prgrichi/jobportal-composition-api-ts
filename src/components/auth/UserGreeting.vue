<template>
  <div v-if="authReady && authStore.isAuthenticated" class="flex items-center gap-2">
    <Icon name="User" icon-class="h-4 w-4 text-white" />
    <p class="text-white transition after:content-['/'] after:ml-4">
      {{ $t('nav.userGreeting') }}, {{ authStore.userName }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { useAuthStore } from '@/stores/auth/auth';

const authStore = useAuthStore();
const authReady = computed(() => authStore.authReady);
</script>

<style scoped></style>
