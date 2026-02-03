<template>
  <!-- Job List Section -->
  <div class="space-y-4">
    <!-- Jobs Grid -->
    <div class="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
      <!-- Loading State:  Initial Skeletons -->
      <template v-if="jobStore.isLoading">
        <JobCardSkeleton v-for="n in 6" :key="`sk-${n}`" />
      </template>

      <!-- Error State -->
      <template v-if="jobStore.error">
        <div class="col-span-full text-center text-red-500">
          {{ jobStore.error }}
        </div>
      </template>

      <!-- Job Cards -->
      <template v-else>
        <JobCard v-for="job in jobStore.filteredJobs" :key="job.id" :job="job" />
      </template>

      <!-- Loading More: Additional Skeletons -->
      <template v-if="jobStore.isLoadingMore">
        <JobCardSkeleton v-for="n in 3" :key="`sk-more-${n}`" />
      </template>
    </div>

    <!-- Load More Button -->
    <div v-if="!jobStore.isLoading && jobStore.hasMore" class="mt-8 text-center">
      <button :disabled="jobStore.isLoadingMore" @click="loadMore" class="btn btn-primary">
        <!-- Loading Spinner -->
        <span
          v-if="jobStore.isLoadingMore"
          class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"
        ></span>
        <span>{{ loadMoreLabel }}</span>
      </button>
    </div>

    <!-- All Jobs Loaded Message -->
    <div
      v-if="!jobStore.hasMore && jobStore.jobs.length > 0 && jobStore.filteredJobs.length !== 0"
      class="mt-8 text-center text-neutral-500"
    >
      {{ $t('jobs.allLoaded', { count: jobStore.jobs.length }) }}
    </div>

    <!-- Empty State:  No Jobs Found -->
    <div v-if="jobStore.jobs.length === 0 && !jobStore.isLoading" class="text-center">
      {{ $t('jobs.jobsNotFound') }}
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import { useJobStore } from '@/stores/jobs/jobs';

import JobCard from './JobCard.vue';
import JobCardSkeleton from './JobCardSkeleton.vue';

const { t } = useI18n();

const jobStore = useJobStore();

// Dynamic load more button label
const loadMoreLabel = computed(() => {
  return jobStore.isLoadingMore ? t('jobs.ui.loading') : t('jobs.ui.loadMore');
});

// Load more jobs (pagination)
const loadMore = () => {
  jobStore.loadMoreJobs({
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
};

onMounted(() => {
  // Initial load:  6 jobs
  jobStore.fetchJobs({
    orderBy: { field: 'createdAt', direction: 'desc' },
    limit: 6,
  });
});
</script>
