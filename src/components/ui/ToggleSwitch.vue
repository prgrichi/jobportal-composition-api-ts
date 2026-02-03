<template>
  <div class="flex items-center gap-3">
    <Icon name="Sun" icon-class="h-4 w-4 text-white" />

    <Switch
      :model-value="modelValue"
      @update:model-value="update"
      :class="modelValue ? 'bg-primary-500' : 'bg-primary-600'"
      class="relative inline-flex items-center h-[20px] w-[40px] border-2 border-white/30 shrink-0 cursor-pointer rounded-full transition-colors duration-100 ease-in-out focus: outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      <span class="sr-only">{{ label }}</span>
      <span
        aria-hidden="true"
        :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
        class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-100 ease-in-out"
      ></span>
    </Switch>

    <Icon name="Moon" icon-class="h-4 w-4 text-white" />
  </div>
</template>

<script setup>
import { Switch } from '@headlessui/vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Use setting',
  },
});

const emit = defineEmits(['update:modelValue']);

const update = value => {
  emit('update:modelValue', value);
};
</script>
