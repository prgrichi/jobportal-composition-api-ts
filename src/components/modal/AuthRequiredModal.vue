<template>
  <BaseModal :isOpen="isOpen" size="md" @close="onClose">
    <template #title>
      {{ $t('modal.authRequired.title') }}
    </template>

    <template #description>
      {{ $t('modal.authRequired.message') }}
    </template>

    <template #footer>
      <button @click="goToLogin" class="btn btn-primary flex-1">
        {{ $t('general.btn.signInNow') }}
      </button>

      <button @click="onClose" class="btn btn-secondary">
        {{ $t('general.btn.cancel') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import { useRouter } from 'vue-router';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};

const router = useRouter();
const goToLogin = () => {
  emit('close');
  router.push('/login');
};
</script>
