<template>

  <section class="space-y-4">

    <!-- DEBUG BOX -->
    <div>
      <DebugBox>
        isLoading: {{ jobStore.isLoading }}<br>
        isLoadingMore: {{ jobStore.isLoadingMore }}<br>
        hasMore: {{ jobStore.hasMore }}<br>
        Jobs: {{ jobStore.jobs.length }}
      </DebugBox>
    </div>
    <!-- DEBUG BOX -->

    <div class="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">

      <template v-if="jobStore.isLoading">
        <JobSkeleton v-for="n in 6" :key="`sk-${n}`" />
      </template>

      <template v-if="jobStore.error">
        <div class="col-span-full text-center text-red-500">
          {{ jobStore.error }}
        </div>
      </template>

      <template v-else>
        <JobSingle v-for="job in jobStore.filteredJobs" :key="job.id" :job="job" />
      </template>

      <!-- Keine Jobs gefunden -->
      <div v-if="jobStore.filteredJobs.length === 0 && !jobStore.isLoading" class="no-results">
        😕 Keine Jobs gefunden
      </div>

      <template v-if="jobStore.isLoadingMore">
        <JobSkeleton v-for="n in 3" :key="`sk-${n}`" />
      </template>
      
    </div>

    <div v-if="!jobStore.isLoading && jobStore.hasMore" class="mt-8 text-center">
      <button :disabled="jobStore.isLoadingMore" @click="loadMore" class="btn btn-primary">
        <span v-if="jobStore.isLoadingMore"
          class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        <span>{{ loadMoreLabel }}</span>
      </button>
    </div>

    <!-- Alle geladen -->
    <div v-if="!jobStore.hasMore && jobStore.jobs.length > 0 && jobStore.filteredJobs.length !== 0"
      class="mt-8 text-center text-gray-500">
      Alle {{ jobStore.jobs.length }} Jobs geladen
    </div>

    <!-- Keine Jobs -->
    <div v-if="jobStore.jobs.length === 0 && !jobStore.isLoading" class="text-center">
      Keine Jobs gefunden
    </div>

  </section>

</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';
import JobSingle from './JobSingle.vue';
import JobSkeleton from './JobSkeleton.vue';

// DEBUG
import DebugBox from '@/components/debug/DebugBox.vue';

export default {
  name: 'JobList',
  components: {
    JobSingle,
    JobSkeleton,
    DebugBox
  },
  methods: {
    async loadMore() {
      await this.jobStore.loadMoreJobs({
        orderBy: { field: 'createdAt', direction: 'desc' }
      });
    },
  },
  computed: {
    jobStore() {
      return useJobStore();
    },
    loadMoreLabel() {
      return this.jobStore.isLoadingMore ? 'laden...' : 'Mehr Jobs laden';
    },
  },
  created() {
    this.jobStore.fetchJobs({
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: 3
    })
  },
}
</script>

<style scoped></style>