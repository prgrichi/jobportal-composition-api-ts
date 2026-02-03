<template>
  <div class="filter-select">
    <label class="sr-only" for="level">
      {{ $t('jobs.filter.levelLabel') }}
    </label>
    <select
      id="level"
      :value="modelValue"
      @change="handleChange"
      class="w-full rounded-xl border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 bg-background cursor-pointer"
    >
      <option value="">
        {{ $t('jobs.filter.allLevels') }}
      </option>
      <option v-for="level in levels" :key="level" :value="level">
        {{ level }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  levels: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleChange = event => {
  emit('update:modelValue', event.target.value);
};
</script>
