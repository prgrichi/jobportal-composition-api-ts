<template>
  <div class="max-w-app mx-auto py-4 space-y-6">

    <!-- Filter -->
    <section class="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        {{ $t('jobs.filter.headline') }}
      </h3>

      <div class="flex flex-col sm:flex-row gap-3 filter-group items-center">
        <label class="sr-only" for="search">Suche</label>
        <input id="search" v-model="localSearchText" type="text" :placeholder="$t('jobs.filter.inputPlaceholder')"
          class="filter-input w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-primary-500/40" />
      </div>

      <div class="flex gap-3 flex-row flex-wrap mt-4">
        <!-- Location Select (NEU) -->
        <div class="filter-select">
          <label class="sr-only" for="location">Standort</label>
          <select id="location" v-model="jobStore.selectedLocation" class="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary-500/40
                   bg-white cursor-pointer">
            <option value="">Alle Standorte</option>
            <option v-for="location in jobStore.availableLocations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
        <button v-if="jobStore.searchText || jobStore.selectedLocation" @click="jobStore.resetFilters()" class="cursor-pointer px-4 py-2 text-sm text-gray-600 hover:text-gray-900 
                 border border-gray-300 rounded-xl hover:bg-gray-50">
          {{ $t('jobs.filter.btn.reset') }}
        </button>
      </div>

      <div class="mt-4" v-if="jobStore.searchText || jobStore.selectedLocation">
        {{ $t('jobs.filter.jobsFound', jobsFoundCount) }}
      </div>

    </section>

  </div>
</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';
import { debounce } from 'lodash-es';

export default {
  name: 'JobFilter',
  data() {
    return {
      localSearchText: '',
    }
  },
  computed: {
    jobStore() {
      return useJobStore();
    },
    jobsFoundCount() {
      return this.jobStore.filteredJobs.length;
    },
  },
  created() {
    this.updateSearch = debounce((value) => {
      this.jobStore.searchText = value;
    }, 300);
  },
  watch: {
    localSearchText(newVal) {
      this.updateSearch(newVal);
    },
  },

}
</script>

<style scoped></style>