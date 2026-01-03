<template>
  <!-- Job List Section -->
  <section class="space-y-4">

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
        <span v-if="jobStore.isLoadingMore"
          class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
        <span>{{ loadMoreLabel }}</span>
      </button>
    </div>

    <!-- All Jobs Loaded Message -->
    <div v-if="!jobStore.hasMore && jobStore.jobs.length > 0 && jobStore.filteredJobs.length !== 0"
      class="mt-8 text-center text-neutral-500">
      {{ $t('jobs.allLoaded', { count: jobStore.jobs.length }) }}
    </div>

    <!-- Empty State:  No Jobs Found -->
    <div v-if="jobStore.jobs.length === 0 && !jobStore.isLoading" class="text-center">
      {{ $t('jobs.jobsNotFound') }}
    </div>

  </section>
</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';
import { useI18n } from 'vue-i18n';
import JobCard from './JobCard. vue';
import JobCardSkeleton from './JobCardSkeleton.vue';

export default {
  name: 'JobList',

  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },

  components: {
    JobCard,
    JobCardSkeleton
  },

  computed: {
    jobStore() {
      return useJobStore();
    },

    // Dynamic load more button label
    loadMoreLabel() {
      return this.jobStore.isLoadingMore
        ? this.t('jobs.ui.loading')
        : this.t('jobs.ui.loadMore');
    }
  },

  methods: {
    // Load more jobs (pagination)
    async loadMore() {
      await this.jobStore.loadMoreJobs({
        orderBy: { field: 'createdAt', direction: 'desc' }
      });
    }
  },

  created() {
    // Initial load:  6 jobs
    this.jobStore.fetchJobs({
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: 6
    });
  }
}
</script>