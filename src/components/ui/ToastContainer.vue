<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="rounded-xl px-4 py-2 text-sm text-white shadow-lg"
      :class="toastType(toast)"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useToastStore } from '@/stores/toast/toast';

const toastStore = useToastStore();
const toasts = computed(() => toastStore.toasts);

const toastType = toast => {
  if (toast.type === 'success') return 'bg-green-600';
  if (toast.type === 'error') return 'bg-red-600';
  return 'bg-gray-600';
};
</script>

<style scoped></style>
