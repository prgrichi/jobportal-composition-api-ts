<template>
  <div class="flex items-center gap-3">
    <button
      v-if="hasActiveFilters"
      @click="$emit('reset')"
      class="cursor-pointer px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-xl hover:bg-muted transition-colors"
    >
      {{ $t('jobs.filter.btn.reset') }}
    </button>

    <div v-if="hasActiveFilters" class="text-sm text-muted-foreground">
      {{ $t('jobs.filter.jobsFound', resultsCount) }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  hasActiveFilters: {
    type: Boolean,
    default: false,
  },
  resultsCount: {
    type: Number,
    default: 0,
  },
});
defineEmits(['reset']);
</script>
