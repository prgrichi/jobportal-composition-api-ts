<template>
  <div class="max-w-app mx-auto py-4 space-y-6">
    <div class="rounded-xl border border-border bg-background p-4 sm:p-6">
      <!-- Header -->
      <div class="flex items-center gap-2 mb-4">
        <Icon name="AdjustmentsVertical" icon-class="h-4 w-4 text-black" />
        <h3 class="text-lg font-semibold text-foreground">
          {{ $t('jobs.filter.headline') }}
        </h3>
      </div>

      <!-- Search Input -->
      <JobSearchInput v-model="localSearchText" class="mb-4" />

      <!-- Dropdowns + Reset -->
      <div class="flex gap-3 flex-row flex-wrap items-center">
        <JobLocationSelect
          v-model="jobStore.selectedLocation"
          :locations="jobStore.availableLocations"
        />

        <JobLevelSelect v-model="jobStore.selectedLevel" :levels="jobStore.availableLevels" />

        <JobFilterReset
          :has-active-filters="hasActiveFilters"
          :results-count="jobStore.filteredJobs.length"
          @reset="resetAll"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

import { useJobStore } from '@/stores/jobs/jobs';
import { debounce } from 'lodash-es';

import JobSearchInput from './filter/JobSearchInput.vue';
import JobLocationSelect from './filter/JobLocationSelect.vue';
import JobLevelSelect from './filter/JobLevelSelect.vue';
import JobFilterReset from './filter/JobFilterReset.vue';

const jobStore = useJobStore();
const localSearchText = ref('');

// Debouncte Funktion einmalig erstellen
const updateSearch = debounce(value => {
  jobStore.searchText = value;
}, 300);

watch(localSearchText, newVal => {
  updateSearch(newVal);
});

const hasActiveFilters = computed(() => {
  return !!(jobStore.searchText || jobStore.selectedLocation || jobStore.selectedLevel);
});

const resetAll = () => {
  localSearchText.value = '';
  jobStore.resetFilters();
};
</script>
