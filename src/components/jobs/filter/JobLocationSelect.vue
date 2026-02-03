<template>
  <div class="filter-select">
    <label class="sr-only" for="location">
      {{ $t('jobs.filter.locationLabel') }}
    </label>
    <select
      id="location"
      :value="modelValue"
      @change="handleChange"
      class="w-full rounded-xl border border-border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 bg-background cursor-pointer"
    >
      <option value="">
        {{ $t('jobs.filter.allLocations') }}
      </option>
      <option v-for="location in locations" :key="location" :value="location">
        {{ location }}
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
  locations: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleChange = event => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped></style>
