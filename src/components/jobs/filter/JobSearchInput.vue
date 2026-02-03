<template>
  <div class="w-full">
    <label class="sr-only" for="job-search">
      {{ $t('jobs.filter.searchLabel') }}
    </label>
    <input
      id="job-search"
      :value="modelValue"
      @input="handleInput"
      type="text"
      :placeholder="$t('jobs.filter.inputPlaceholder')"
      class="w-full rounded-xl border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
const handleInput = event => {
  emit('update:modelValue', event.target.value);
};
</script>
