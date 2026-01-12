<template>
  <div class="flex gap-3 mt-6">
    <button @click="emit('save')" :disabled="isSaving" class="btn btn-primary">
      <span
        v-if="isSaving"
        class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"
      ></span>
      <span>{{ saveButtonText }}</span>
    </button>

    <button @click="emit('cancel')" class="btn btn-secondary" :disabled="isSaving">
      {{ cancelButtonText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  isSaving: {
    type: Boolean,
    default: false,
  },
  saveButtonText: {
    type: String,
    default: 'Speichern',
  },
  cancelButtonText: {
    type: String,
    default: 'Abbrechen',
  },
});

const emit = defineEmits(['save', 'cancel']);
</script>
